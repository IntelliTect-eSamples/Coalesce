
/// <reference path="../coalesce.dependencies.d.ts" />

// Generated by IntelliTect.Coalesce

module ListViewModels {
    
    export namespace CaseDataSources {
        export class Default extends Coalesce.DataSource<ViewModels.Case> { }
        export class AllOpenCases extends Coalesce.DataSource<ViewModels.Case> {
            public minDate: KnockoutObservable<moment.Moment | null> = ko.observable(null);
            public saveToDto = () => {
                var dto: any = {};
                if (!this.minDate()) dto.minDate = null;
                else dto.minDate = this.minDate()!.format('YYYY-MM-DDTHH:mm:ssZZ');
                return dto;
            }
        }
    }
    
    export class CaseList extends Coalesce.BaseListViewModel<ViewModels.Case> {
        public readonly modelName: string = "Case";
        public readonly apiController: string = "/Case";
        public modelKeyName: string = "caseKey";
        public itemClass: new () => ViewModels.Case = ViewModels.Case;
        
        public filter: {
            caseKey?: string;
            title?: string;
            description?: string;
            openedAt?: string;
            assignedToId?: string;
            reportedById?: string;
            imageName?: string;
            imageSize?: string;
            imageHash?: string;
            attachmentName?: string;
            internalUseFileSize?: string;
            severity?: string;
            status?: string;
            devTeamAssignedId?: string;
        } | null = null;
        
        /** The namespace containing all possible values of this.dataSource. */
        public dataSources: typeof CaseDataSources = CaseDataSources;
        
        /** The data source on the server to use when retrieving objects. Valid values are in this.dataSources. */
        public dataSource: Coalesce.DataSource<ViewModels.Case> = new this.dataSources.Default();
        
        /** Configuration for all instances of CaseList. Can be overidden on each instance via instance.coalesceConfig. */
        public static coalesceConfig = new Coalesce.ListViewModelConfiguration<CaseList, ViewModels.Case>(Coalesce.GlobalConfiguration.listViewModel);
        
        /** Configuration for this CaseList instance. */
        public coalesceConfig: Coalesce.ListViewModelConfiguration<CaseList, ViewModels.Case>
            = new Coalesce.ListViewModelConfiguration<CaseList, ViewModels.Case>(CaseList.coalesceConfig);
        
        
        /**
            Methods and properties for invoking server method GetSomeCases.
        */
        public readonly getSomeCases = new CaseList.GetSomeCases(this);
        public static GetSomeCases = class GetSomeCases extends Coalesce.ClientMethod<CaseList, ViewModels.Case[]> {
            public readonly name = 'GetSomeCases';
            public readonly verb = 'POST';
            public result: KnockoutObservableArray<ViewModels.Case> = ko.observableArray([]);
            
            /** Calls server method (GetSomeCases) with the given arguments */
            public invoke = (callback?: (result: ViewModels.Case[]) => void, reload: boolean = true): JQueryPromise<any> => {
                return this.invokeWithData({  }, callback, reload);
            };
            
            protected loadResponse = (data: Coalesce.ItemResult, callback?: (result: ViewModels.Case[]) => void, reload: boolean = true) => {
                Coalesce.KnockoutUtilities.RebuildArray(this.result, data.object, 'caseKey', ViewModels.Case, this, true);
                if (reload) {
                    var result = this.result();
                    this.parent.load(typeof(callback) == 'function' ? () => callback(result) : undefined);
                } else if (typeof(callback) == 'function') {
                    callback(this.result());
                }
            };
        };
        
        /**
            Methods and properties for invoking server method GetAllOpenCasesCount.
        */
        public readonly getAllOpenCasesCount = new CaseList.GetAllOpenCasesCount(this);
        public static GetAllOpenCasesCount = class GetAllOpenCasesCount extends Coalesce.ClientMethod<CaseList, number> {
            public readonly name = 'GetAllOpenCasesCount';
            public readonly verb = 'POST';
            
            /** Calls server method (GetAllOpenCasesCount) with the given arguments */
            public invoke = (callback?: (result: number) => void, reload: boolean = true): JQueryPromise<any> => {
                return this.invokeWithData({  }, callback, reload);
            };
            
            protected loadResponse = (data: Coalesce.ItemResult, callback?: (result: number) => void, reload: boolean = true) => {
                this.result(data.object);
                if (reload) {
                    var result = this.result();
                    this.parent.load(typeof(callback) == 'function' ? () => callback(result) : undefined);
                } else if (typeof(callback) == 'function') {
                    callback(this.result());
                }
            };
        };
        
        /**
            Methods and properties for invoking server method RandomizeDatesAndStatus.
        */
        public readonly randomizeDatesAndStatus = new CaseList.RandomizeDatesAndStatus(this);
        public static RandomizeDatesAndStatus = class RandomizeDatesAndStatus extends Coalesce.ClientMethod<CaseList, void> {
            public readonly name = 'RandomizeDatesAndStatus';
            public readonly verb = 'POST';
            
            /** Calls server method (RandomizeDatesAndStatus) with the given arguments */
            public invoke = (callback?: (result: void) => void, reload: boolean = true): JQueryPromise<any> => {
                return this.invokeWithData({  }, callback, reload);
            };
            
            protected loadResponse = (data: Coalesce.ItemResult, callback?: (result: void) => void, reload: boolean = true) => {
                this.result(data.object);
                if (reload) {
                    var result = this.result();
                    this.parent.load(typeof(callback) == 'function' ? () => callback(result) : undefined);
                } else if (typeof(callback) == 'function') {
                    callback(this.result());
                }
            };
        };
        
        /**
            Methods and properties for invoking server method GetCaseSummary.
            Returns a list of summary information about Cases
        */
        public readonly getCaseSummary = new CaseList.GetCaseSummary(this);
        public static GetCaseSummary = class GetCaseSummary extends Coalesce.ClientMethod<CaseList, ViewModels.CaseSummary> {
            public readonly name = 'GetCaseSummary';
            public readonly verb = 'POST';
            
            /** Calls server method (GetCaseSummary) with the given arguments */
            public invoke = (callback?: (result: ViewModels.CaseSummary) => void, reload: boolean = true): JQueryPromise<any> => {
                return this.invokeWithData({  }, callback, reload);
            };
            
            protected loadResponse = (data: Coalesce.ItemResult, callback?: (result: ViewModels.CaseSummary) => void, reload: boolean = true) => {
                if (!this.result()) {
                    this.result(new ViewModels.CaseSummary(data.object));
                } else {
                    this.result().loadFromDto(data.object);
                }
                if (reload) {
                    var result = this.result();
                    this.parent.load(typeof(callback) == 'function' ? () => callback(result) : undefined);
                } else if (typeof(callback) == 'function') {
                    callback(this.result());
                }
            };
        };
        
        protected createItem = (newItem?: any, parent?: any) => new ViewModels.Case(newItem, parent);
        
        constructor() {
            super();
        }
    }
}
