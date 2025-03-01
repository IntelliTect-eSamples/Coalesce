
/// <reference path="../coalesce.dependencies.d.ts" />

// Generated by IntelliTect.Coalesce

module ViewModels {
    
    export class Company extends Coalesce.BaseViewModel {
        public readonly modelName = "Company";
        public readonly primaryKeyName = "id";
        public readonly modelDisplayName = "Company";
        public readonly apiController = "/Company";
        public readonly viewController = "/Company";
        
        /** Configuration for all instances of Company. Can be overidden on each instance via instance.coalesceConfig. */
        public static coalesceConfig: Coalesce.ViewModelConfiguration<Company>
            = new Coalesce.ViewModelConfiguration<Company>(Coalesce.GlobalConfiguration.viewModel);
        
        /** Configuration for the current Company instance. */
        public coalesceConfig: Coalesce.ViewModelConfiguration<this>
            = new Coalesce.ViewModelConfiguration<Company>(Company.coalesceConfig);
        
        /** The namespace containing all possible values of this.dataSource. */
        public dataSources: typeof ListViewModels.CompanyDataSources = ListViewModels.CompanyDataSources;
        
        
        public id: KnockoutObservable<number | null> = ko.observable(null);
        public name: KnockoutObservable<string | null> = ko.observable(null);
        public address1: KnockoutObservable<string | null> = ko.observable(null);
        public address2: KnockoutObservable<string | null> = ko.observable(null);
        public city: KnockoutObservable<string | null> = ko.observable(null);
        public state: KnockoutObservable<string | null> = ko.observable(null);
        public zipCode: KnockoutObservable<string | null> = ko.observable(null);
        public phone: KnockoutObservable<string | null> = ko.observable(null);
        public websiteUrl: KnockoutObservable<string | null> = ko.observable(null);
        public logoUrl: KnockoutObservable<string | null> = ko.observable(null);
        public isDeleted: KnockoutObservable<boolean | null> = ko.observable(null);
        public employees: KnockoutObservableArray<ViewModels.Person> = ko.observableArray([]);
        public altName: KnockoutObservable<string | null> = ko.observable(null);
        
        
        
        /** Add object to employees */
        public addToEmployees = (autoSave?: boolean | null): Person => {
            var newItem = new Person();
            if (typeof(autoSave) == 'boolean'){
                newItem.coalesceConfig.autoSaveEnabled(autoSave);
            }
            newItem.parent = this;
            newItem.parentCollection = this.employees;
            newItem.isExpanded(true);
            newItem.companyId(this.id());
            this.employees.push(newItem);
            return newItem;
        };
        
        /** ListViewModel for Employees. Allows for loading subsets of data. */
        public employeesList: (loadImmediate?: boolean) => ListViewModels.PersonList;
        
        
        /** Url for a table view of all members of collection Employees for the current object. */
        public employeesListUrl: KnockoutComputed<string> = ko.computed(
            () => this.coalesceConfig.baseViewUrl() + '/Person/Table?filter.companyId=' + this.id(),
            null, { deferEvaluation: true }
        );
        
        
        
        
        
        /** Methods and properties for invoking server method ConflictingParameterNames. */
        public readonly conflictingParameterNames = new Company.ConflictingParameterNames(this);
        public static ConflictingParameterNames = class ConflictingParameterNames extends Coalesce.ClientMethod<Company, void> {
            public readonly name = 'ConflictingParameterNames';
            public readonly verb = 'POST';
            
            /** Calls server method (ConflictingParameterNames) with the given arguments */
            public invoke = (companyParam: ViewModels.Company | null, name: string | null, callback?: (result: void) => void, reload: boolean = true): JQueryPromise<any> => {
                return this.invokeWithData({ id: this.parent.id(), companyParam: companyParam?.saveToDto(), name: name }, callback, reload);
            };
            
            /** Object that can be easily bound to fields to allow data entry for the method's parameters */
            public args = new ConflictingParameterNames.Args(); 
            public static Args = class Args {
                public companyParam: KnockoutObservable<ViewModels.Company | null> = ko.observable(null);
                public name: KnockoutObservable<string | null> = ko.observable(null);
            };
            
            /** Calls server method (ConflictingParameterNames) with an instance of ConflictingParameterNames.Args, or the value of this.args if not specified. */
            public invokeWithArgs = (args = this.args, callback?: (result: void) => void, reload: boolean = true): JQueryPromise<any> => {
                return this.invoke(args.companyParam(), args.name(), callback, reload);
            }
            
            /** Invokes the method after displaying a browser-native prompt for each argument. */
            public invokeWithPrompts = (callback?: (result: void) => void, reload: boolean = true): JQueryPromise<any> | undefined => {
                var $promptVal: string | null = null;
                $promptVal = prompt('Name');
                if ($promptVal === null) return;
                var name: string = $promptVal;
                var companyParam: null = null;
                return this.invoke(companyParam, name, callback, reload);
            };
            
            protected loadResponse = (data: Coalesce.ItemResult, jqXHR: JQuery.jqXHR, callback?: (result: void) => void, reload: boolean = true) => {
                this.result(data.object);
                if (reload) {
                    var result = this.result();
                    this.parent.load(null, typeof(callback) == 'function' ? () => callback(result) : undefined);
                } else if (typeof(callback) == 'function') {
                    callback(this.result());
                }
            };
        };
        
        /** 
            Load the ViewModel object from the DTO.
            @param data: The incoming data object to load.
            @param force: Will override the check against isLoading that is done to prevent recursion. False is default.
            @param allowCollectionDeletes: Set true when entire collections are loaded. True is the default. 
            In some cases only a partial collection is returned, set to false to only add/update collections.
        */
        public loadFromDto = (data: any, force: boolean = false, allowCollectionDeletes: boolean = true): void => {
            if (!data || (!force && this.isLoading())) return;
            this.isLoading(true);
            // Set the ID 
            this.myId = data.id;
            this.id(data.id);
            // Load the lists of other objects
            if (data.employees != null) {
                // Merge the incoming array
                Coalesce.KnockoutUtilities.RebuildArray(this.employees, data.employees, 'personId', Person, this, allowCollectionDeletes);
            }
            
            // The rest of the objects are loaded now.
            this.name(data.name);
            this.address1(data.address1);
            this.address2(data.address2);
            this.city(data.city);
            this.state(data.state);
            this.zipCode(data.zipCode);
            this.phone(data.phone);
            this.websiteUrl(data.websiteUrl);
            this.logoUrl(data.logoUrl);
            this.isDeleted(data.isDeleted);
            this.altName(data.altName);
            if (this.coalesceConfig.onLoadFromDto()){
                this.coalesceConfig.onLoadFromDto()(this as any);
            }
            this.isLoading(false);
            this.isDirty(false);
            if (this.coalesceConfig.validateOnLoadFromDto()) this.validate();
        };
        
        /** Saves this object into a data transfer object to send to the server. */
        public saveToDto = (): any => {
            var dto: any = {};
            dto.id = this.id();
            
            dto.name = this.name();
            dto.address1 = this.address1();
            dto.address2 = this.address2();
            dto.city = this.city();
            dto.state = this.state();
            dto.zipCode = this.zipCode();
            dto.phone = this.phone();
            dto.websiteUrl = this.websiteUrl();
            dto.logoUrl = this.logoUrl();
            dto.isDeleted = this.isDeleted();
            
            return dto;
        }
        
        /** 
            Loads any child objects that have an ID set, but not the full object.
            This is useful when creating an object that has a parent object and the ID is set on the new child.
        */
        public loadChildren = (callback?: () => void): void => {
            var loadingCount = 0;
            if (loadingCount == 0 && typeof(callback) == "function") { callback(); }
        };
        
        public setupValidation(): void {
            if (this.errors !== null) return;
            this.errors = ko.validation.group([
            ]);
            this.warnings = ko.validation.group([
            ]);
        }
        
        constructor(newItem?: object, parent?: Coalesce.BaseViewModel | ListViewModels.CompanyList) {
            super(parent);
            this.baseInitialize();
            const self = this;
            
            
            
            // List Object model for Employees. Allows for loading subsets of data.
            var _employeesList: ListViewModels.PersonList;
            this.employeesList = function(loadImmediate = true) {
                if (!_employeesList) {
                    _employeesList = new ListViewModels.PersonList();
                    if (loadImmediate) loadEmployeesList();
                    self.id.subscribe(loadEmployeesList)
                }
                return _employeesList;
            }
            function loadEmployeesList() {
                if (self.id()) {
                    _employeesList.queryString = "filter.CompanyId=" + self.id();
                    _employeesList.load();
                }
            }
            
            
            
            self.name.subscribe(self.autoSave);
            self.address1.subscribe(self.autoSave);
            self.address2.subscribe(self.autoSave);
            self.city.subscribe(self.autoSave);
            self.state.subscribe(self.autoSave);
            self.zipCode.subscribe(self.autoSave);
            self.phone.subscribe(self.autoSave);
            self.websiteUrl.subscribe(self.autoSave);
            self.logoUrl.subscribe(self.autoSave);
            self.isDeleted.subscribe(self.autoSave);
            
            if (newItem) {
                self.loadFromDto(newItem, true);
            }
        }
    }
    
    export namespace Company {
    }
}
