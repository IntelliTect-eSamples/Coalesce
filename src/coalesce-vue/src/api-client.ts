import { onBeforeUnmount, Ref, ref, markRaw } from "vue";

import {
  ModelType,
  Method,
  Service,
  ApiRoutedType,
  DataSourceType,
  ModelValue,
  CollectionValue,
  ItemMethod,
  ListMethod,
  TypeDiscriminatorToType,
  PropNames,
} from "./metadata.js";
import {
  Model,
  convertToModel,
  mapToDto,
  DataSource,
  mapToModel,
  mapToDtoFiltered,
  parseValue,
} from "./model.js";
import {
  Indexable,
  objectToQueryString,
  objectToFormData,
  ReactiveFlags_SKIP,
  getInternalInstance,
  VueInstance,
} from "./util.js";

import axios, {
  AxiosPromise,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  CancelTokenSource,
} from "axios";

/* Api Response Objects */

export interface ApiResult {
  wasSuccessful: boolean;
  message?: string;
}

export interface ValidationIssue {
  property: string;
  issue: string;
}

export interface ItemResult<T = any> extends ApiResult {
  object?: T;
  validationIssues?: ValidationIssue[];
}

export interface ListResult<T = any> extends ApiResult {
  list?: T[];
  page: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
}

/* Api Parameter Objects */

export interface DataSourceParameters {
  /** A string that the server may use to include/exclude certain data from the results. See Coalesce's full documentation for details. */
  includes?: string | null;

  /**
   * A data source instance that will be used to load the data.
   * Classes are found in `models.g.ts` as `<ModelName>.DataSources.<DataSourceName>`, e.g. `Person.DataSources.WithRelations`.
   */
  dataSource?: DataSource<DataSourceType> | null;
}
export class DataSourceParameters {
  constructor() {
    this.includes = null;
    this.dataSource = null;
  }
}

export interface SaveParameters<T extends Model<ModelType> = any>
  extends DataSourceParameters {
  /**
   * A list of field names to save.
   * If set, only the specified fields as well as any primary key
   * will be sent to the server. The server will ignore fields that are not set.
   */
  fields?: PropNames<T["$metadata"]>[] | null;
}
export class SaveParameters<
  T extends Model<ModelType>
> extends DataSourceParameters {
  constructor() {
    super();
    this.fields = null;
  }
}

export interface FilterParameters extends DataSourceParameters {
  /** A search term to search by. Searching behavior is determined by the server. */
  search?: string | null;

  /** A collection of key-value pairs to filter by. Behavior is dependent on the type of each field, see Coalesce's full documentation for details. */
  filter?: {
    [fieldName: string]: string | number | boolean | null | undefined;
  } | null;
}
export class FilterParameters extends DataSourceParameters {
  constructor() {
    super();
    this.search = null;
    this.filter = null;
  }
}

export interface ListParameters extends FilterParameters {
  /** The page of data to request, starting at 1. */
  page?: number | null;

  /** The number of items per page to request. */
  pageSize?: number | null;

  /** If true, a total count of items will not be determined. `pageCount` and `totalCount` will be returned as -1. */
  noCount?: boolean | null;

  /**
   * The name of a field to order the results by.
   *  If this and `orderByDescending` are blank, default ordering determined by the server will be used.
   * */
  orderBy?: string | null;
  /**
   * The name of a field to order the results by in descending order.
   * If this and `orderBy` are blank, default ordering determined by the server will be used.
   * */

  orderByDescending?: string | null;

  /**
   * A list of field names to request. The results returned will only have these fields populated - all other fields will be null.
   */
  fields?: string[] | null;
}
export class ListParameters extends FilterParameters {
  constructor() {
    super();
    this.page = 1;
    this.pageSize = 10;
    this.noCount = null;
    this.orderBy = null;
    this.orderByDescending = null;
    this.fields = null;
  }
}

export type StandardParameters =
  | ListParameters
  | FilterParameters
  | DataSourceParameters
  | SaveParameters;

/**
 * Maps the given API standard parameters object into an flat object of key-value pairs
 * that is suitable for use as a URL querystring.
 * @param parameters The parameters to map.
 */
export function mapParamsToDto(parameters?: StandardParameters) {
  if (!parameters) return null;

  // Assume the widest type, which is ListParameters.
  var wideParams = parameters as Partial<ListParameters>;

  // The list of 'simple' params where we just pass along the exact value.
  var simpleParams = [
    "includes",
    "search",
    "page",
    "pageSize",
    "noCount",
    "orderBy",
    "orderByDescending",
  ] as const;

  // Map all the simple params to `paramsObject`
  var paramsObject = simpleParams.reduce((obj, key) => {
    if (key in wideParams && wideParams[key] != null) {
      obj[key] = String(wideParams[key]);
    }
    return obj;
  }, {} as { [s: string]: string });

  // Map the 'filter' object, ensuring all values are strings.
  const filter = wideParams.filter;
  if (typeof filter == "object" && filter) {
    for (var key in filter) {
      let value = filter[key];
      if (value !== undefined) {
        paramsObject["filter." + key] = String(value);
      }
    }
  }

  if (Array.isArray(wideParams.fields)) {
    paramsObject.fields = wideParams.fields.join(",");
  }

  // Map the data source and its params
  const dataSource = wideParams.dataSource as Indexable<
    typeof wideParams.dataSource
  >;
  if (dataSource) {
    // Add the data source name
    paramsObject["dataSource"] = dataSource.$metadata.name;
    var paramsMeta = dataSource.$metadata.props;

    // Add the data source parameters.
    // Note that we use "dataSource.{paramName}", not a nested object.
    // This is what the model binder expects.
    for (var paramName in paramsMeta) {
      const paramMeta = paramsMeta[paramName];
      if (paramName in dataSource) {
        const paramValue = dataSource[paramName];
        paramsObject["dataSource." + paramMeta.name] = mapToDto(
          paramValue,
          paramMeta
        ) as any;
      }
    }
  }

  return paramsObject;
}

const dummyValue = {
  role: "value",
  displayName: "",
} as const;

/**
 * Maps the given flat object of key-value pairs into an API parameters object.
 * @param dto The flat object to map.
 * @param parametersType The constructor of the parameters object to create.
 * @param modelClass The generated model class (containing a `DataSources` namespace) 1
 */
export function mapQueryToParams<T extends StandardParameters>(
  flatQuery: any,
  parametersType: new () => T,
  modelMeta: ModelType
): T {
  const dto = flatQuery; // alias for brevity

  const parameters = new parametersType();

  if (parameters instanceof ListParameters) {
    if ("page" in dto)
      parameters.page = parseValue(dto.page, {
        type: "number",
        name: "page",
        ...dummyValue,
      });
    if ("pageSize" in dto)
      parameters.pageSize = parseValue(dto.pageSize, {
        type: "number",
        name: "pageSize",
        ...dummyValue,
      });
    if ("noCount" in dto)
      parameters.noCount = parseValue(dto.noCount, {
        type: "boolean",
        name: "noCount",
        ...dummyValue,
      });
    if ("orderBy" in dto) parameters.orderBy = dto.orderBy;
    if ("orderByDescending" in dto)
      parameters.orderByDescending = dto.orderByDescending;
    if ("fields" in dto) parameters.fields = String(dto.fields).split(",");
  }

  if (parameters instanceof FilterParameters) {
    if ("search" in dto) parameters.search = dto.search;
    for (const key in dto) {
      if (key.startsWith("filter.") && dto[key] !== undefined) {
        parameters.filter = parameters.filter ?? {};
        parameters.filter[key.replace("filter.", "")] = dto[key];
      }
    }
  }

  if (parameters instanceof DataSourceParameters) {
    if ("includes" in dto) parameters.includes = dto.includes;

    if ("dataSource" in dto && dto.dataSource in modelMeta.dataSources) {
      const dataSource = mapToModel({}, modelMeta.dataSources[dto.dataSource]);
      parameters.dataSource = dataSource;

      for (const key in dto) {
        if (key.startsWith("dataSource.")) {
          var paramName = key.replace("dataSource.", "");
          if (paramName in dataSource.$metadata.props) {
            (dataSource as any)[paramName] = mapToModel(
              dto[key],
              dataSource.$metadata.props[paramName]
            );
          }
        }
      }
    }
  }

  return parameters as T;
}

async function parseApiResult(data: any): Promise<ApiResult | null> {
  if (
    data instanceof Blob &&
    data.size > 0 &&
    data.type == "application/json"
  ) {
    // For file-returning endpoints, we ask axios to return us a Blob.
    // However, this means that if the endpoint fails and returns JSON,
    // it will return the ApiResult's JSON inside a blob. This extracts it back out.
    data = await new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        try {
          resolve(JSON.parse(reader.result as string));
        } catch (e) {
          reject(e);
        }
      };
      reader.readAsText(data);
    });
  }

  if (typeof data !== "object" || !("wasSuccessful" in data)) {
    return null;
  }

  return data;
}

export function getMessageForError(error: unknown): string {
  const e = error as AxiosError | ApiResult | Error | string;
  if (typeof e === "string") {
    return e;
  } else if (typeof e === "object" && e != null) {
    if ("isAxiosError" in e) {
      const result = e.response as
        | AxiosResponse<ListResult<any> | ItemResult<any>>
        | undefined;

      if (
        result &&
        typeof result.data === "object" &&
        "message" in result.data
      ) {
        return result.data.message || "Unknown Error";
      }

      // Axios normally returns a message like "Request failed with status code 403".
      // We can get the status text out of the response to make this a little nicer.
      // (appending "(Forbidden)", etc. to the end of the message.)
      const statusText = e.response?.statusText;
      if (statusText && e.message && !e.message.includes(statusText)) {
        return `${e.message} (${statusText})`;
      }
    }

    return "message" in e && typeof e.message === "string"
      ? e.message!
      : "A network error occurred"; // TODO: i18n
  } else {
    return "An unknown error occurred";
  }
}

export type AxiosItemResult<T> = AxiosResponse<ItemResult<T>>;
export type AxiosListResult<T> = AxiosResponse<ListResult<T>>;
export type ItemResultPromise<T> = Promise<AxiosResponse<ItemResult<T>>>;
export type ListResultPromise<T> = Promise<AxiosResponse<ListResult<T>>>;
// ApiResultPromise must be the inner union of the promise types, not the outer union of two promises.
// Otherwise, typescript doesn't like us calling a function with a union return type. For some reason.
export type ApiResultPromise<T> = Promise<
  AxiosItemResult<T> | AxiosListResult<T>
>;

/** Axios instance to be used by all Coalesce API requests. Can be configured as needed. */
export const AxiosClient = axios.create();
AxiosClient.defaults.baseURL = "/api";

// Set X-Requested-With: XmlHttpRequest to prevent aspnetcore from serving HTML and redirects to API requests.
// https://github.com/dotnet/aspnetcore/blob/c440ebcf49badd49f0e2cdde1b0a74992af04158/src/Security/Authentication/Cookies/src/CookieAuthenticationEvents.cs#L107-L111
AxiosClient.interceptors.request.use((config) => {
  const url = (config.baseURL ?? "") + (config.url ?? "");
  if (url && !url.startsWith("/")) {
    // Url is not relative. We want to parse it and determine what its origin is.

    if (!URL || new URL(url).origin !== window?.location?.origin) {
      // The origin check is because we don't want to trigger CORS preflights for this.
      // If this IS important for someone on the very unlikely scenario of CORS w/ Coalesce,
      // they can just configure this behavior on the server by overriding the CookieAuthenticationEvents.
      return config;
    }
  }
  return {
    ...config,
    headers: {
      ...config.headers,
      ["X-Requested-With"]: "XMLHttpRequest",
    },
  };
});

export type ApiCallerConcurrency = "cancel" | "disallow" | "allow" | "debounce";

type ItemTransportTypeSpecifier<T extends ApiRoutedType = any> =
  | "item"
  | ItemMethod
  | ((methods: T["methods"]) => ItemMethod);

type ListTransportTypeSpecifier<T extends ApiRoutedType = any> =
  | "list"
  | ListMethod
  | ((methods: T["methods"]) => ListMethod);

type TransportTypeSpecifier<T extends ApiRoutedType = any> =
  | ItemTransportTypeSpecifier<T>
  | ListTransportTypeSpecifier<T>;

type ResultPromiseType<
  T extends TransportTypeSpecifier,
  TResult
> = T extends ItemTransportTypeSpecifier
  ? ItemResultPromise<TResult>
  : T extends ListTransportTypeSpecifier
  ? ListResultPromise<TResult>
  : never;

type ApiCallerInvoker<
  TArgs extends any[],
  TReturn,
  TClient extends ApiClient<any>
> = (this: any, client: TClient, ...args: TArgs) => TReturn;

type ApiCallerArgsInvoker<TArgs, TReturn, TClient extends ApiClient<any>> = (
  this: any,
  client: TClient,
  args: TArgs
) => TReturn;

export type ApiStateType<
  T extends TransportTypeSpecifier,
  TArgs extends any[],
  TResult
> = T extends ItemTransportTypeSpecifier
  ? ItemApiState<TArgs, TResult>
  : T extends ListTransportTypeSpecifier
  ? ListApiState<TArgs, TResult>
  : never;

export type ApiStateTypeWithArgs<
  T extends TransportTypeSpecifier,
  TArgs extends any[],
  TArgsObj extends {},
  TResult
> = T extends ItemTransportTypeSpecifier
  ? ItemApiStateWithArgs<TArgs, TArgsObj, TResult>
  : T extends ListTransportTypeSpecifier
  ? ListApiStateWithArgs<TArgs, TArgsObj, TResult>
  : never;

const simultaneousGetCache: Map<string, AxiosPromise<any>> = new Map();

export class ApiClient<T extends ApiRoutedType> {
  /** See comments on ReactiveFlags_SKIP for explanation.
   * @internal
   */
  private readonly [ReactiveFlags_SKIP] = true;

  constructor(public $metadata: T) {}

  /** Configuration to inject into the next request. */
  private _nextRequestConfig?: Partial<AxiosRequestConfig>;

  /** Flag to enable global caching of identical GET requests
   * that have been made simultaneously.
   */
  protected _simultaneousGetCaching = false;

  /** Enable simultaneous request caching, causing identical GET requests made
   * at the same time across all ApiClient instances to be handled with the same AJAX request.
   */
  public $withSimultaneousRequestCaching(): this {
    this._simultaneousGetCaching = true;
    return this;
  }

  /**
   * Create a wrapper function for an API call. This function maintains properties which represent the state of its previous invocation.
   * @param resultType An indicator of whether the API endpoint returns an ItemResult<T> or a ListResult<T>
   * @param invokerFactory method that will call the API. The signature of the function, minus the apiClient parameter, will be the call signature of the wrapper.
   */
  $makeCaller<
    TArgs extends any[],
    TResult,
    TTransportType extends TransportTypeSpecifier<T>
  >(
    resultType: TTransportType,
    invoker: ApiCallerInvoker<
      TArgs,
      ResultPromiseType<TTransportType, TResult>,
      this
    >
  ): ApiStateType<TTransportType, TArgs, TResult>;

  /**
   * Create a wrapper function for an API call. This function maintains properties which represent the state of its previous invocation.
   * @param resultType An indicator of whether the API endpoint returns an ItemResult<T> or a ListResult<T>
   * @param invokerFactory method that will call the API. The signature of the function, minus the apiClient parameter, will be the call signature of the wrapper.
   */
  $makeCaller<
    TArgs extends any[],
    TResult,
    TTransportType extends TransportTypeSpecifier<T>
  >(
    resultType: TTransportType,
    invoker: ApiCallerInvoker<
      TArgs,
      ResultPromiseType<TTransportType, TResult> | undefined | void,
      this
    >
  ): ApiStateType<TTransportType, TArgs, TResult>;

  /**
   * Create a wrapper function for an API call. This function maintains properties which represent the state of its previous invocation.
   * @param resultType An indicator of whether the API endpoint returns an ItemResult<T> or a ListResult<T>
   * @param invokerFactory method that will call the API. The signature of the function, minus the apiClient parameter, will be the call signature of the wrapper.
   * @param invokerFactory method that will call the API with an args object as the only parameter. This may be called by using `.withArgs()` on the function that is returned from `$makeCaller`. The value of the args object will default to `.args` if not specified.
   */
  $makeCaller<
    TArgs extends any[],
    TArgsObj extends {},
    TResult,
    TTransportType extends TransportTypeSpecifier<T>
  >(
    resultType: TTransportType,
    invoker: ApiCallerInvoker<
      TArgs,
      ResultPromiseType<TTransportType, TResult>,
      this
    >,
    argsFactory?: () => TArgsObj,
    argsInvoker?: ApiCallerArgsInvoker<
      TArgsObj,
      ResultPromiseType<TTransportType, TResult>,
      this
    >
  ): ApiStateTypeWithArgs<TTransportType, TArgs, TArgsObj, TResult>;

  /**
   * Create a wrapper function for an API call. This function maintains properties which represent the state of its previous invocation.
   * @param resultType An indicator of whether the API endpoint returns an ItemResult<T> or a ListResult<T>
   * @param invokerFactory method that will call the API. The signature of the function, minus the apiClient parameter, will be the call signature of the wrapper.
   * @param invokerFactory method that will call the API with an args object as the only parameter. This may be called by using `.withArgs()` on the function that is returned from `$makeCaller`. The value of the args object will default to `.args` if not specified.
   */
  $makeCaller<
    TArgs extends any[],
    TArgsObj extends {},
    TResult,
    TTransportType extends TransportTypeSpecifier<T>
  >(
    resultType: TTransportType,
    invoker: ApiCallerInvoker<
      TArgs,
      ResultPromiseType<TTransportType, TResult> | undefined | void,
      this
    >,
    argsFactory?: () => TArgsObj,
    argsInvoker?: ApiCallerArgsInvoker<
      TArgsObj,
      ResultPromiseType<TTransportType, TResult> | undefined | void,
      this
    >
  ): ApiStateTypeWithArgs<TTransportType, TArgs, TArgsObj, TResult>;

  $makeCaller<
    TArgs extends any[],
    TArgsObj extends {},
    TResult,
    TTransportType extends TransportTypeSpecifier<T>
  >(
    resultType: TTransportType,
    invoker: ApiCallerInvoker<
      TArgs,
      ResultPromiseType<TTransportType, TResult> | undefined | void,
      this
    >,
    argsFactory?: () => TArgsObj,
    argsInvoker?: ApiCallerArgsInvoker<
      TArgsObj,
      ResultPromiseType<TTransportType, TResult> | undefined | void,
      this
    >
  ): any {
    let localResultType: TransportTypeSpecifier<T> = resultType;
    let meta: Method | undefined = undefined;
    if (typeof localResultType === "function") {
      meta = localResultType(this.$metadata.methods);
      localResultType = meta.transportType;
    } else if (typeof localResultType === "object") {
      meta = localResultType;
      localResultType = localResultType.transportType;
    }

    // This is basically all just about resolving the overloads.
    // We use `any` because the types get really messy if you try to handle both types at once.

    var instance;
    if (argsFactory && argsInvoker) {
      switch (localResultType) {
        case "item":
          instance = new ItemApiStateWithArgs<TArgs, TArgsObj, TResult>(
            this,
            invoker as any,
            argsFactory,
            argsInvoker as any
          );
          break;
        case "list":
          instance = new ListApiStateWithArgs<TArgs, TArgsObj, TResult>(
            this,
            invoker as any,
            argsFactory,
            argsInvoker as any
          );
          break;
        default:
          throw `Unknown result type ${localResultType}`;
      }
    } else {
      switch (localResultType) {
        case "item":
          instance = new ItemApiState<TArgs, TResult>(this, invoker as any);
          break;
        case "list":
          instance = new ListApiState<TArgs, TResult>(this, invoker as any);
          break;
        default:
          throw `Unknown result type ${localResultType}`;
      }
    }

    // Set this on the instance if we have it.
    instance.$metadata = meta;

    return instance as any;
  }

  public $invoke<TMethod extends ItemMethod>(
    method: TMethod,
    params: ParamsObject<TMethod>,
    config?: AxiosRequestConfig,
    standardParameters?: DataSourceParameters
  ): AxiosPromise<
    ItemResult<TypeDiscriminatorToType<TMethod["return"]["type"]>>
  >;

  public $invoke<TMethod extends ListMethod>(
    method: TMethod,
    params: ParamsObject<TMethod>,
    config?: AxiosRequestConfig,
    standardParameters?: DataSourceParameters
  ): AxiosPromise<
    ListResult<TypeDiscriminatorToType<TMethod["return"]["type"]>>
  >;

  /**
   * Invoke the specified method using the provided set of parameters.
   * @param method The metadata of the API method to invoke
   * @param params The parameters to provide to the API method.
   * @param config A full `AxiosRequestConfig` to merge in.
   */
  public $invoke<TMethod extends Method>(
    method: TMethod,
    params: ParamsObject<TMethod>,
    config?: AxiosRequestConfig,
    standardParameters?: DataSourceParameters
  ) {
    const mappedParams = this.$mapParams(method, params);
    const url = `/${this.$metadata.controllerRoute}/${method.name}`;

    let body: any;
    let query: any;

    if (method.httpMethod != "GET" && method.httpMethod != "DELETE") {
      // The HTTP method has a body.

      query = undefined;

      const formData = objectToFormData(mappedParams);
      let hasFile = false;
      formData.forEach((v) => (hasFile ||= v instanceof File));

      if (hasFile) {
        // If the endpoint has any files or raw binary, we need to use a FormData.
        // (Blobs become Files when put into FormData, and we serialize UInt8Array into a Blob)
        // This will form a multipart/form-data response.
        body = formData;
      } else {
        // No top-level special values - just handle the params normally.
        // This will form a application/x-www-form-urlencoded response.
        body = objectToQueryString(mappedParams);
      }
    } else {
      // The HTTP method has no body.

      body = undefined;
      query = mappedParams;
    }

    const axiosRequest = <AxiosRequestConfig>{
      method: method.httpMethod,
      url: url,
      data: body,
      responseType: method.return.type == "file" ? "blob" : "json",
      ...this._nextRequestConfig,
      ...config,
      params: {
        ...query,
        ...(config && config.params ? config.params : null),
        ...mapParamsToDto(standardParameters),
      },
    };

    if (this._observedRequests) {
      this._observedRequests.push({ request: axiosRequest, method: method });
      if (!this._observedRequests.doRequest) {
        return new Promise(() => {
          /* never resolve */
        });
      }
    }

    let doCache = false;
    let cacheKey: string;

    if (
      method.httpMethod === "GET" &&
      this._simultaneousGetCaching &&
      !config
    ) {
      cacheKey = AxiosClient.getUri(axiosRequest);
      if (simultaneousGetCache.has(cacheKey)) {
        return simultaneousGetCache.get(cacheKey)!;
      } else {
        doCache = true;
      }
    }

    let promise = AxiosClient.request(axiosRequest).then((r) => {
      if (typeof r.data !== "object") {
        // This case usually only happens if the endpoint doesn't exist on the server,
        // causing the server to return a SPA fallback route (as HTML) with a 200 status.
        throw new Error(
          `Unexpected ${
            r.headers?.["content-type"]
          } ${typeof r.data} response from server.`
        );
      }

      switch (method.return.type) {
        case "file":
          // Determine the name of the downloaded file.
          // https://stackoverflow.com/a/40940790
          let disposition = r.headers["content-disposition"];
          let filename = "";
          if (disposition && disposition.indexOf("attachment") !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
              filename = matches[1].replace(/['"]/g, "");
            }
          }

          // Wrap the blob obtained from Axios into a Coalesce ItemResult.
          const blob: Blob = r.data;
          r.data = <ItemResult<File>>{
            wasSuccessful: true,
            object: new File([blob], filename, { type: blob.type }),
          };
          return r;

        case "void":
          return r;

        default:
          switch (method.transportType) {
            case "item":
              r.data.object = convertToModel(r.data.object, method.return);
              return r;
            case "list":
              r.data.list = convertToModel(r.data.list, method.return);
              return r;
          }
      }
    });

    if (doCache) {
      // Add the promise to the cache.
      simultaneousGetCache.set(cacheKey!, promise);

      // Remove the promise from the cache when it completes.
      promise = promise.then(
        (x) => {
          // Remove the request from the cache, because its done now.
          simultaneousGetCache.delete(cacheKey);
          return x;
        },
        (e) => {
          simultaneousGetCache.delete(cacheKey);
          // Re-throw the error so callers down the line can handle it.
          throw e;
        }
      );
    }

    return promise;
  }

  // NOTE: DO NOT init _observedRequests to null. This _should_ be nonreactive.
  private _observedRequests?: {
    request: AxiosRequestConfig;
    method: Method;
  }[] & {
    readonly doRequest: boolean;
  };

  /** Invokes `func`, capturing the parameter of any API calls within $invoke() invocations.,
   * If `capture` is true, no HTTP request will be made, being replaced by a never-resolving promise.
   */
  private _observeRequests<TFuncResult>(
    func: () => TFuncResult,
    capture = false
  ): [TFuncResult, { request: AxiosRequestConfig; method: Method }[]] {
    const old = this._observedRequests;
    try {
      const capturedRequests = (this._observedRequests = Object.defineProperty(
        [] as any,
        "doRequest",
        {
          enumerable: false,
          value: capture,
        }
      ));
      const result = func();
      return [result, capturedRequests];
    } finally {
      this._observedRequests = old;
    }
  }

  /**
   * Maps the given method parameters to values suitable for transport.
   * @param method The method whose parameters need mapping
   * @param params The values of the parameter to map
   */
  protected $mapParams(method: Method, params: { [paramName: string]: any }) {
    const formatted: {
      [paramName: string]:
        | ReturnType<typeof mapToDto>
        | File
        | Blob
        | Uint8Array;
    } = {};
    for (var paramName in method.params) {
      const paramMeta = method.params[paramName];
      const paramValue = params[paramName];

      if (paramValue === undefined) continue;

      const pureType =
        paramMeta.type == "collection" ? paramMeta.itemType : paramMeta;
      if (pureType.type == "file" || pureType.type == "binary") {
        // Preserve top-level files and binary (and arrays of such) as their original format
        formatted[paramName] = parseValue(paramValue, paramMeta);
      } else {
        formatted[paramName] = mapToDto(paramValue, paramMeta);
      }
    }
    return formatted;
  }
}

export type ParamsObject<TMethod extends Method> = {
  [P in keyof TMethod["params"]]: TypeDiscriminatorToType<
    TMethod["params"][P]["type"]
  > | null;
};

export class ModelApiClient<TModel extends Model<ModelType>> extends ApiClient<
  TModel["$metadata"]
> {
  public get(
    id: string | number,
    parameters?: DataSourceParameters,
    config?: AxiosRequestConfig
  ): ItemResultPromise<TModel> {
    return this.$invoke(
      {
        name: `get/${id}`,
        displayName: "get",
        transportType: "item",
        httpMethod: "GET",
        params: {},
        return: this.$itemValueMeta,
      },
      {},
      config,
      parameters
    );
  }

  public list(
    parameters?: ListParameters,
    config?: AxiosRequestConfig
  ): ListResultPromise<TModel> {
    return this.$invoke(
      {
        name: "list",
        displayName: "list",
        transportType: "list",
        httpMethod: "GET",
        params: {},
        return: this.$collectionValueMeta,
      },
      {},
      config,
      parameters
    );
  }

  public count(
    parameters?: FilterParameters,
    config?: AxiosRequestConfig
  ): ItemResultPromise<number> {
    return this.$invoke(
      {
        name: "count",
        displayName: "count",
        transportType: "item",
        httpMethod: "GET",
        params: {},
        return: {
          name: "$return",
          displayName: "Result",
          type: "number",
          role: "value",
        },
      },
      {},
      config,
      parameters
    );
  }

  public save(
    item: TModel,
    parameters?: SaveParameters<TModel>,
    config?: AxiosRequestConfig
  ): ItemResultPromise<TModel> {
    const { fields, ...params } = parameters ?? new SaveParameters<TModel>();

    return this.$invoke(
      {
        name: "save",
        displayName: "save",
        transportType: "item",
        httpMethod: "POST",
        params: Object.fromEntries(
          Object.entries(this.$metadata.props).filter(
            (p) => !p[1].dontSerialize
          )
        ),
        return: this.$itemValueMeta,
      },
      mapToDtoFiltered(item, fields)!,
      config,
      params
    );
  }

  public delete(
    id: string | number,
    parameters?: DataSourceParameters,
    config?: AxiosRequestConfig
  ): ItemResultPromise<TModel> {
    return this.$invoke(
      {
        name: `delete/${id}`,
        displayName: "delete",
        transportType: "item",
        httpMethod: "POST",
        params: {},
        return: this.$itemValueMeta,
      },
      {},
      config,
      parameters
    );
  }

  /** Value metadata for handling ItemResult returns from the standard API endpoints. */
  private get $itemValueMeta(): ModelValue {
    return {
      name: "object",
      displayName: "",
      type: "model",
      role: "value",
      typeDef: this.$metadata,
    };
  }

  /** Value metadata for handling ListResult returns from the standard API endpoints. */
  private get $collectionValueMeta(): CollectionValue {
    return {
      name: "list",
      displayName: "",
      type: "collection",
      role: "value",
      itemType: this.$itemValueMeta,
    };
  }
}

export abstract class ServiceApiClient<
  TMeta extends Service
> extends ApiClient<TMeta> {}

type ApiStateHook<TThis> = (this: any, state: TThis) => void | Promise<any>;

export type ResponseCachingConfiguration = {
  /** Function that will determine the cache key used for a particular request.
   * Return a falsy value to prevent caching. The default key is the request URL.
   */
  key?: (
    req: AxiosRequestConfig,
    defaultKey: string
  ) => string | null | undefined;

  /** The maximum age of a cached response. If null, the entry will not expire. Default 1 hour.
   *
   * The smallest of the current configured max age and the max age that was set at the time of the cached response is used. */
  maxAgeSeconds?: number | null;

  /** The Storage (default `sessionStorage`) that will hold cached responses. */
  storage?: Storage;
};

// Base class for ApiState that contains nothing but the logic for
// subclassing Function. Specifically, we do this to avoid a need to call
// `super()`, which triggers CSP unsafe-eval.
abstract class ApiStateBase<TArgs extends any[], TResult> {
  /** Invokes a call to this API endpoint. */
  public readonly invoke!: this;

  protected readonly apiClient!: ApiClient<any>;
  protected readonly invoker!: ApiCallerInvoker<
    TArgs,
    ApiResultPromise<TResult> | undefined | void,
    ApiClient<any>
  >;
  protected abstract _invokeInternal(
    thisArg: any,
    callInvoker: () => any
  ): ApiResultPromise<TResult>;

  constructor(
    apiClient: ApiClient<any>,
    invoker: ApiCallerInvoker<
      TArgs,
      ApiResultPromise<TResult> | undefined | void,
      ApiClient<any>
    >
  ) {
    // Create our invoker function that will ultimately be our instance object.
    const invokeFunc = function invokeFunc(this: any, ...args: TArgs) {
      return invoke._invokeInternal(this, () => {
        return (invoker as any).apply(this, [apiClient, ...args]);
      });
    };

    const invoke = invokeFunc as unknown as this;

    // Manually assign ctor props
    // @ts-expect-error
    invoke.invoke = invoke;
    // @ts-expect-error
    invoke.invoker = invoker;
    // @ts-expect-error
    invoke.apiClient = apiClient;

    Object.setPrototypeOf(invoke, new.target.prototype);
    return invoke;
  }
}

// @ts-ignore Workaround for https://github.com/evanw/esbuild/issues/1918,
// an error that happens when esbuild transforms the class fields
// into incorrectly using `this` even though our actual constructor does not use `this`.
// Using `this` before a call to `super` (which we don't have or need either of these)
// when the class has a base class is invalid in JS. But we can prevent this by
// assigning the base class prototype directly, hiding the existence of a base class from JS.
// The reason we can't inherit from Function and just call `super()` is because doing so
// will create an empty function which won't be used, and doing so triggers CSP unsafe-eval.
ApiStateBase.prototype.__proto__ = Function;

export abstract class ApiState<
  TArgs extends any[],
  TResult
> extends ApiStateBase<TArgs, TResult> {
  /** See comments on ReactiveFlags_SKIP for explanation.
   * @internal
   */
  private readonly [ReactiveFlags_SKIP] = true;

  /** The metadata of the method being called, if it was provided. */
  abstract $metadata?: Method;

  abstract result: TResult | TResult[] | null;

  private readonly __isLoading = ref(false);
  /** True if a request is currently pending. */
  get isLoading() {
    return this.__isLoading.value;
  }
  set isLoading(v) {
    this.__isLoading.value = v;
  }

  private readonly __wasSuccessful = ref<boolean | null>(null);
  /** True if the previous request was successful. */
  get wasSuccessful() {
    return this.__wasSuccessful.value;
  }
  set wasSuccessful(v) {
    this.__wasSuccessful.value = v;
  }

  private readonly __message = ref<string | null>(null);
  /** Error message returned by the previous request. */
  get message() {
    return this.__message.value;
  }
  set message(v) {
    this.__message.value = v;
  }

  private readonly __hasResult = ref<boolean>(false);
  /** Whether `.result` is null or not.
   * Using this prop to check for a result avoids a subscription
   * against the whole result object, which will change each time the method is called.
   */
  get hasResult() {
    return this.__hasResult.value;
  }
  set hasResult(v) {
    this.__hasResult.value = v;
  }

  private __responseCacheConfig?: ResponseCachingConfiguration;
  /**
   * Enable response caching for the API caller,
   * saving previous responses to persistent storage (default: `sessionStorage`) so they can later
   * be used to populate `result` when an identical request is made but before any initial network response is received.
   *
   * Response caching does not prevent any HTTP requests from being made, but instead
   * will temporarily load an old response while the fresh response is being fetched.
   *
   * Do not use for any endpoint that could contain sensitive data.
   */
  useResponseCaching(configuration?: ResponseCachingConfiguration | false) {
    if (this.$metadata && this.$metadata.httpMethod != "GET") {
      // Preemptively guard against this since it'll likely be a common mistake.
      throw new Error("Response caching can only be used on HTTP GET methods.");
    }

    this.__responseCacheConfig =
      configuration === false
        ? undefined
        : configuration === undefined
        ? {}
        : markRaw(configuration);
    return this;
  }

  private _concurrencyMode: ApiCallerConcurrency = "disallow";

  /**
   * Set the concurrency mode for this API caller. Default is "disallow".
   * @param mode Behavior for when a request is made while there is already an outstanding request.
   *
   * "cancel" - Cancel the outstanding request first.
   *
   * "debounce" - if a request is made while one is outstanding, enqueue it to start after the outstanding
   * request is done. If another request is made while one is already enqueued, the enqueued request is abandoned
   * and replaced by the last request that was made.
   *
   * "disallow" - Throw an error.
   *
   * "allow" - Permit the second request to be made. The ultimate values of the state fields may not be representative of the last request made.
   */
  setConcurrency(mode: ApiCallerConcurrency) {
    // This method exists as a way to configure this in a chainable way when instantiating API callers.
    this._concurrencyMode = mode;
    return this;
  }

  /**
   * Get or set the concurrency mode for this API caller. Default is "disallow".
   * @param mode Behavior for when a request is made while there is already an outstanding request.
   *
   * "cancel" - cancel the outstanding request first.
   *
   * "debounce" - if a request is made while one is outstanding, enqueue it to start after the outstanding
   * request is done. If another request is made while one is already enqueued, the enqueued request is abandoned
   * and replaced by the last request that was made.
   *
   * "disallow" - throw an error.
   *
   * "allow" - permit the second request to be made. The ultimate state of the state fields may not be representative of the last request made.
   */
  get concurrencyMode() {
    return this._concurrencyMode;
  }
  set concurrencyMode(val: ApiCallerConcurrency) {
    this.setConcurrency(val);
  }

  private _cancelToken: CancelTokenSource | undefined;

  /**
   * Function that can be called to cancel a pending request.
   */
  cancel() {
    if (this._cancelToken) {
      this._cancelToken.cancel();
      this.isLoading = false;
    }
  }

  private _callbacks: {
    onFulfilled: Array<ApiStateHook<any>>;
    onRejected: Array<ApiStateHook<any>>;
  } = { onFulfilled: [], onRejected: [] };

  /**
   * Attach a callback to be invoked when the request to this endpoint succeeds.
   * @param callback A callback to be called when a request to this endpoint succeeds.
   */
  onFulfilled(callback: ApiStateHook<this>): this {
    if (!this._callbacks.onFulfilled.includes(callback)) {
      this._callbacks.onFulfilled.push(callback);
    }
    return this;
  }

  /**
   * Attach a callback to be invoked when the request to this endpoint fails.
   * @param callback A callback to be called when a request to this endpoint fails.
   */
  onRejected(callback: ApiStateHook<this>): this {
    if (!this._callbacks.onRejected.includes(callback)) {
      this._callbacks.onRejected.push(callback);
    }
    return this;
  }

  protected abstract setResponseProps(data: ApiResult): void;

  private _debounceSignal: {
    promise: Promise<void>;
    resolve: () => void;
    reject: () => void;
  } | null = null;

  protected async _invokeInternal(thisArg: any, callInvoker: () => any) {
    if (this.isLoading) {
      switch (this._concurrencyMode) {
        case "disallow":
          throw Error(
            `Request is already pending for invoker ${this.invoker.toString()}`
          );

        case "cancel":
          this.cancel();
          break;

        case "debounce":
          // If there's already a pending debounced request,
          // reject it, and then create a new promise and await a successful signal.
          if (this._debounceSignal) {
            this._debounceSignal.reject();
          }

          const signal: any = {};
          signal.promise = new Promise((resolve, reject) => {
            signal.resolve = resolve;
            signal.reject = reject;
          });
          this._debounceSignal = signal;

          // Await completion of the current outstanding request,
          // or until another call is made while we're still pending.
          try {
            await signal.promise;
          } catch {
            // Similar to the "cancel" mode,
            // aborted requests are not thrown as rejected promises,
            // but instead as a fulfilled promise with a void resolved value.
            return undefined;
          }
      }
    }

    // Change no state except `isLoading` until after the promise is resolved.
    // this.wasSuccessful = null
    // this.message = null
    this.isLoading = true;

    // Inject a cancellation token into the request.
    try {
      const token = axios.CancelToken.source();
      (this.apiClient as any)._nextRequestConfig = <AxiosRequestConfig>{
        cancelToken: token.token,
      };

      const responseCacheConfig = this.__responseCacheConfig;
      if (responseCacheConfig) {
        const originalCallInvoker = callInvoker;
        callInvoker = async () => {
          //@ts-expect-error _observeRequests is private because TS has no `internal`.
          const [promise, requests] = this.apiClient._observeRequests(
            originalCallInvoker,
            true
          );
          const { request, method } = requests[0];
          if (!request || !promise) return promise;

          const {
            key: keyFunc,
            storage = sessionStorage,
            maxAgeSeconds: configuredMaxAge = 3600,
          } = responseCacheConfig!;

          if (request.method?.toUpperCase() != "GET") {
            // We don't strictly NEED to limit this to GET,
            // however, determining the cache key gets much harder when it isn't a GET,
            // and in general you just probably shouldn't be caching the results of non-GETs.
            console.warn(
              "useResponseCaching cannot be used on ApiCallers that invoke a non-GET endpoint."
            );
            return promise;
          }
          if (method.return.type == "file" || method.return.type == "void") {
            // Can't store files, and obviously caching void is meaningless.
            console.warn(
              `useResponseCaching cannot be used on ApiCallers that invoke a ${method.return.type}-returning endpoint.`
            );
            return promise;
          }

          const defaultKey = AxiosClient.getUri(request);
          const userKey = keyFunc ? keyFunc(request, defaultKey) : defaultKey;
          if (!userKey) return promise;

          const key = `coalesce:${userKey}`;

          const cachedValue = storage.getItem(key);
          if (cachedValue && this.wasSuccessful === null && !this.hasResult) {
            const {
              time,
              maxAge: storedMaxAge,
              result,
            } = JSON.parse(cachedValue);

            // Use the shortest of the two max ages (stored, and current config)
            // to be sure that stale entries are never taken, even when the configured maxAge
            // may have increased or decreased since the cache entry was saved.
            const effectiveMaxAge = Math.min(
              storedMaxAge || Number.MAX_VALUE,
              configuredMaxAge || Number.MAX_VALUE
            );

            if (time >= Date.now() / 1000 - effectiveMaxAge) {
              // Cache entries are stripped of their metadata when saved, so they need to be re-converted to a model.
              // We also need to perform this conversion in case the properties
              // of the models have changed since this cache entry was created.
              switch (method.transportType) {
                case "item":
                  convertToModel(result.object, method.return);
                case "list":
                  convertToModel(result.list, method.return);
              }

              this.setResponseProps(result);

              // Invoke the fulfilled callbacks so that ViewModel.$load and ListViewModel.$load
              // will work normally, populating the ViewModel with the results.
              const onFulfilled = this._callbacks.onFulfilled;
              for (let i = 0; i < onFulfilled.length; i++) {
                const cb = onFulfilled[i];
                const cbResult = cb.apply(thisArg, [this]);
                if (cbResult instanceof Promise) {
                  await cbResult;
                }
              }
            }
          }

          const resp = await promise;

          // We didn't throw, so store the successful response in the cache
          const data = resp.data;
          storage.setItem(
            key,
            JSON.stringify(
              {
                time: Date.now() / 1000,
                maxAge: configuredMaxAge,
                result: data,
              },
              (key, value) => (key == "$metadata" ? undefined : value)
            )
          );

          return resp;
        };
      }

      this._cancelToken = token;
      let promise = callInvoker();

      if (!promise) {
        this.isLoading = false;
        return undefined;
      }

      const resp = await promise;

      const data = resp.data;
      delete this._cancelToken;

      this.setResponseProps(data);

      const onFulfilled = this._callbacks.onFulfilled;
      for (let i = 0; i < onFulfilled.length; i++) {
        const cb = onFulfilled[i];
        const cbResult = cb.apply(thisArg, [this]);
        if (cbResult instanceof Promise) {
          await cbResult;
        }
      }

      this.isLoading = false;

      // We have to maintain the shape of the promise of the stateless invoke method.
      // This means we can't re-shape ourselves into a Promise<ApiState<T>> with `return fn` here.
      // The reason for this is that we can't change the return type of TCall while maintaining
      // the param signature (unless we required a full, explicit type annotation as a type parameter,
      // but this would make the usability of apiCallers very unpleasant.)
      // We could do this easily with https://github.com/Microsoft/TypeScript/issues/5453,
      // but changing the implementation would be a significant breaking change by then.
      return resp;
    } catch (thrown) {
      if (axios.isCancel(thrown)) {
        // No handling of anything for cancellations.
        // A cancellation is deliberate and shouldn't be treated as an error state. Callbacks should not be called either - pretend the request never happened.
        // If a compelling case for invoking callbacks on cancel is found,
        // it should probably be implemented as a separate set of callbacks.
        // We don't set isLoading to false here - we set it in the cancel() method to ensure that we don't set isLoading=false for a subsequent call,
        // since the promise won't reject immediately after requesting cancellation. There could already be another request pending when this code is being executed.
        return;
      } else {
        var error = thrown as AxiosError | ApiResult | Error | string;
      }

      try {
        delete this._cancelToken;
        this.wasSuccessful = false;
        const result =
          typeof error === "object" && "response" in error
            ? (error.response as
                | AxiosResponse<ListResult<TResult> | ItemResult<TResult>>
                | undefined)
            : undefined;

        let resultJson;
        if (result && (resultJson = await parseApiResult(result.data))) {
          this.setResponseProps(resultJson);
        } else {
          this.message = getMessageForError(error);
        }

        const onRejected = this._callbacks.onRejected;
        for (let i = 0; i < onRejected.length; i++) {
          const cb = onRejected[i];
          const cbResult = cb.apply(thisArg, [this]);
          if (cbResult instanceof Promise) {
            await cbResult;
          }
        }
      } finally {
        this.isLoading = false;
      }

      throw error;
    } finally {
      delete (this.apiClient as any)._nextRequestConfig;

      if (this._debounceSignal) {
        this._debounceSignal.resolve();
        this._debounceSignal = null;
      }
    }
  }

  constructor(
    apiClient: ApiClient<any>,
    invoker: ApiCallerInvoker<
      TArgs,
      ApiResultPromise<TResult> | undefined | void,
      ApiClient<any>
    >
  ) {
    super(apiClient, invoker);
  }
}

export interface ItemApiState<TArgs extends any[], TResult> {
  /** Invokes a call to this API endpoint. */
  (...args: TArgs): ItemResultPromise<TResult>;
}
export class ItemApiState<TArgs extends any[], TResult> extends ApiState<
  TArgs,
  TResult
> {
  /** The metadata of the method being called, if it was provided. */
  $metadata?: ItemMethod;

  private readonly __validationIssues = ref<ValidationIssue[] | null>(null);
  /** Validation issues returned by the previous request. */
  get validationIssues() {
    return this.__validationIssues.value;
  }
  set validationIssues(v) {
    this.__validationIssues.value = v;
  }

  private readonly __result = ref<TResult | null>(null) as Ref<TResult | null>;
  /** Principal data returned by the previous request. */
  get result() {
    return this.__result.value;
  }
  set result(v) {
    this.__result.value = v;
    this.hasResult = v != null;
  }

  constructor(
    apiClient: ApiClient<any>,
    invoker: ApiCallerInvoker<
      TArgs,
      ApiResultPromise<TResult> | undefined | void,
      ApiClient<any>
    >
  ) {
    super(apiClient, invoker);
  }

  private _objectUrl?: {
    url?: string;
    target?: TResult;
    hooked: WeakSet<VueInstance>;
    active: number;
  };
  /** If the result is a blob or file, returns an Object URL representing that result.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
   * @param vue A Vue instance through which the lifecycle of the object URL will be managed.
   */
  public getResultObjectUrl(
    vue: VueInstance
  ): undefined | (TResult extends Blob ? string : never) {
    const result = this.result;
    if (result == this._objectUrl?.target) {
      // We have a stored URL, and the current result is what that URL was made for.
      // OR, we have no stored URL, and the current result is also null-ish.
      // Return that stored URL.

      // @ts-expect-error TS can't infer that this is correct.
      return this._objectUrl?.url;
    }

    if (this._objectUrl?.url) {
      // If we got this far and we have a stored URL, it doesn't match the current result.
      // Destroy that URL and then we'll make a new one.
      URL.revokeObjectURL(this._objectUrl?.url);
    }

    if (result instanceof Blob) {
      // Result is useful as an object url. Make one!

      this._objectUrl ??= {
        hooked: new WeakSet(),
        active: 0,
      };
      const objUrl = this._objectUrl!;
      objUrl.url = URL.createObjectURL(result);
      objUrl.target = result;

      if (!objUrl.hooked.has(vue)) {
        objUrl.active++;
        objUrl.hooked.add(vue);
        onBeforeUnmount(() => {
          objUrl.active--;
          if (objUrl.url && objUrl.active == 0) {
            URL.revokeObjectURL(objUrl.url);
            objUrl.url = undefined;
            objUrl.target = undefined;
          }
        }, getInternalInstance(vue));
      }

      // @ts-expect-error TS can't figure out that we correctly narrowed on TResult here.
      return this._objectUrl.url;
    }

    return undefined;
  }

  protected setResponseProps(data: ItemResult<TResult>) {
    this.wasSuccessful = data.wasSuccessful;
    this.message = data.message || null;

    if ("validationIssues" in data) {
      this.validationIssues = data.validationIssues || null;
    } else {
      this.validationIssues = null;
    }
    if ("object" in data) {
      this.result = data.object ?? null;
    } else {
      this.result = null;
    }
    this.hasResult = this.result != null;
  }
}

export class ItemApiStateWithArgs<
  TArgs extends any[],
  TArgsObj,
  TResult
> extends ItemApiState<TArgs, TResult> {
  private readonly __args = ref<TArgsObj>() as Ref<TArgsObj>;
  /** Values that will be used as arguments if the method is invoked with `this.invokeWithArgs()`. */
  get args() {
    return this.__args.value;
  }
  set args(v) {
    this.__args.value = v;
  }

  /** Invokes a call to this API endpoint.
   * If `args` is not provided, the values in `this.args` will be used for the method's parameters. */
  public invokeWithArgs(
    args: TArgsObj = this.args
  ): ResultPromiseType<"item", TResult> {
    // Copy args so that if we're debouncing,
    // the args at the point in time at which invokeWithArgs() was
    // called will be used, rather than the state at the time when the actual API call gets made.
    args = { ...args };

    return this._invokeInternal(this, () =>
      this.argsInvoker.apply(this, [this.apiClient, args])
    );
  }

  /** Replace `this.args` with a new, blank object containing default values (typically nulls) */
  public resetArgs() {
    this.args = this.argsFactory();
  }

  /** Returns the URL for the endpoint, including querystring parameters, if invoked using `this.args`. */
  get url() {
    const request =
      // @ts-expect-error: _observeRequests is private (since TS has no "internal")
      this.apiClient._observeRequests(() => {
        this.argsInvoker.apply(this, [this.apiClient, this.args]);
      }, false)[1][0].request;

    if (!request) return null;
    let url = AxiosClient.getUri(request);

    // Workaround for https://github.com/axios/axios/issues/2468.
    // Prepend the baseURL if not already present
    // (It might be present e.g. if the above issue gets fixed).
    let baseURL = AxiosClient.defaults.baseURL;
    if (baseURL && !url.startsWith(baseURL)) {
      url = baseURL.replace(/\/+$/, "") + url;
    }
    return url;
  }

  constructor(
    apiClient: ApiClient<any>,
    invoker: ApiCallerInvoker<
      TArgs,
      ItemResultPromise<TResult>,
      ApiClient<any>
    >,
    private argsFactory: () => TArgsObj,
    private argsInvoker: ApiCallerArgsInvoker<
      TArgsObj,
      ItemResultPromise<TResult>,
      ApiClient<any>
    >
  ) {
    super(apiClient, invoker);
    this.resetArgs();
  }
}

export interface ListApiState<TArgs extends any[], TResult> {
  /** Invokes a call to this API endpoint. */
  (...args: TArgs): ListResultPromise<TResult>;
}
export class ListApiState<TArgs extends any[], TResult> extends ApiState<
  TArgs,
  TResult
> {
  /** The metadata of the method being called, if it was provided. */
  $metadata?: ListMethod;

  private readonly __page = ref<number | null>(null);
  /** Page number returned by the previous request. */
  get page() {
    return this.__page.value;
  }
  set page(v) {
    this.__page.value = v;
  }

  private readonly __pageSize = ref<number | null>(null);
  /** Page size returned by the previous request. */
  get pageSize() {
    return this.__pageSize.value;
  }
  set pageSize(v) {
    this.__pageSize.value = v;
  }

  private readonly __pageCount = ref<number | null>(null);
  /** Page count returned by the previous request. */
  get pageCount() {
    return this.__pageCount.value;
  }
  set pageCount(v) {
    this.__pageCount.value = v;
  }

  private readonly __totalCount = ref<number | null>(null);
  /** Total Count returned by the previous request. */
  get totalCount() {
    return this.__totalCount.value;
  }
  set totalCount(v) {
    this.__totalCount.value = v;
  }

  private readonly __result = ref<TResult[] | null>(null) as Ref<
    TResult[] | null
  >;
  /** Principal data returned by the previous request. */
  get result() {
    return this.__result.value;
  }
  set result(v) {
    this.__result.value = v;
  }

  constructor(
    apiClient: ApiClient<any>,
    invoker: ApiCallerInvoker<
      TArgs,
      ApiResultPromise<TResult> | undefined | void,
      ApiClient<any>
    >
  ) {
    super(apiClient, invoker);
  }

  protected setResponseProps(data: ListResult<TResult>) {
    this.wasSuccessful = data.wasSuccessful;
    this.message = data.message || null;

    this.page = data.page;
    this.pageSize = data.pageSize;
    this.pageCount = data.pageCount;
    this.totalCount = data.totalCount;

    if ("list" in data) {
      this.result = data.list || [];
    } else {
      this.result = null;
    }
    this.hasResult = this.result != null;
  }
}

export class ListApiStateWithArgs<
  TArgs extends any[],
  TArgsObj,
  TResult
> extends ListApiState<TArgs, TResult> {
  private readonly __args = ref<TArgsObj>() as Ref<TArgsObj>;
  /** Values that will be used as arguments if the method is invoked with `this.invokeWithArgs()`. */
  get args() {
    return this.__args.value;
  }
  set args(v) {
    this.__args.value = v;
  }

  /** Invokes a call to this API endpoint.
   * If `args` is not provided, the values in `this.args` will be used for the method's parameters. */
  public invokeWithArgs(
    args: TArgsObj = this.args
  ): ResultPromiseType<"list", TResult> {
    args = { ...args }; // Copy args so that if we're debouncing,
    // the args at the point in time at which invokeWithArgs() was
    // called will be used, rather than the state at the time when the actual API call gets made.
    return this._invokeInternal(this, () =>
      this.argsInvoker.apply(this, [this.apiClient, args])
    );
  }

  /** Replace `this.args` with a new, blank object containing default values (typically nulls) */
  public resetArgs() {
    this.args = this.argsFactory();
  }

  constructor(
    apiClient: ApiClient<any>,
    invoker: ApiCallerInvoker<
      TArgs,
      ListResultPromise<TResult>,
      ApiClient<any>
    >,
    private argsFactory: () => TArgsObj,
    private argsInvoker: ApiCallerArgsInvoker<
      TArgsObj,
      ListResultPromise<TResult>,
      ApiClient<any>
    >
  ) {
    super(apiClient, invoker);
    this.resetArgs();
  }
}

export type AnyArgCaller<
  TArgs extends any[] = any[],
  TArgsObj = any,
  TResult = any
> =
  | ListApiStateWithArgs<TArgs, TArgsObj, TResult>
  | ItemApiStateWithArgs<TArgs, TArgsObj, TResult>;
