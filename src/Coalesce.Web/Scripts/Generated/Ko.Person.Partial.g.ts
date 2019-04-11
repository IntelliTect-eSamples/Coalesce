
/// <reference path="../coalesce.dependencies.d.ts" />

// Generated by IntelliTect.Coalesce

module ViewModels {
    
    export class PersonPartial extends Coalesce.BaseViewModel {
        public readonly modelName = "Person";
        public readonly primaryKeyName = "personId";
        public readonly modelDisplayName = "Person";
        public readonly apiController = "/Person";
        public readonly viewController = "/Person";
        
        /** Configuration for all instances of Person. Can be overidden on each instance via instance.coalesceConfig. */
        public static coalesceConfig: Coalesce.ViewModelConfiguration<Person>
            = new Coalesce.ViewModelConfiguration<Person>(Coalesce.GlobalConfiguration.viewModel);
        
        /** Configuration for the current Person instance. */
        public coalesceConfig: Coalesce.ViewModelConfiguration<this>
            = new Coalesce.ViewModelConfiguration<PersonPartial>(Person.coalesceConfig);
        
        /** The namespace containing all possible values of this.dataSource. */
        public dataSources: typeof ListViewModels.PersonDataSources = ListViewModels.PersonDataSources;
        
        
        
        /** ID for the person object. */
        public personId: KnockoutObservable<number | null> = ko.observable(null);
        
        /** Title of the person, Mr. Mrs, etc. */
        public title: KnockoutObservable<number | null> = ko.observable(null);
        
        /** Text value for enumeration Title */
        public titleText: KnockoutComputed<string | null> = ko.pureComputed(() => {
            for(var i = 0; i < this.titleValues.length; i++){
                if (this.titleValues[i].id == this.title()){
                    return this.titleValues[i].value;
                }
            }
            return null;
        });
        
        /** First name of the person. */
        public firstName: KnockoutObservable<string | null> = ko.observable(null);
        
        /** Last name of the person */
        public lastName: KnockoutObservable<string | null> = ko.observable(null);
        
        /** Email address of the person */
        public email: KnockoutObservable<string | null> = ko.observable(null);
        
        /** Genetic Gender of the person. */
        public gender: KnockoutObservable<number | null> = ko.observable(null);
        
        /** Text value for enumeration Gender */
        public genderText: KnockoutComputed<string | null> = ko.pureComputed(() => {
            for(var i = 0; i < this.genderValues.length; i++){
                if (this.genderValues[i].id == this.gender()){
                    return this.genderValues[i].value;
                }
            }
            return null;
        });
        
        /** List of cases assigned to the person */
        public casesAssigned: KnockoutObservableArray<ViewModels.Case> = ko.observableArray([]);
        
        /** List of cases reported by the person. */
        public casesReported: KnockoutObservableArray<ViewModels.Case> = ko.observableArray([]);
        public birthDate: KnockoutObservable<moment.Moment | null> = ko.observable(null);
        public lastBath: KnockoutObservable<moment.Moment | null> = ko.observable(null);
        public nextUpgrade: KnockoutObservable<moment.Moment | null> = ko.observable(null);
        public personStats: KnockoutObservable<ViewModels.PersonStats | null> = ko.observable(null);
        
        /** Calculated name of the person. eg., Mr. Michael Stokesbary. */
        public name: KnockoutObservable<string | null> = ko.observable(null);
        
        /** Company ID this person is employed by */
        public companyId: KnockoutObservable<number | null> = ko.observable(null);
        
        /** Company loaded from the Company ID */
        public company: KnockoutObservable<ViewModels.Company | null> = ko.observable(null);
        public arbitraryCollectionOfStrings: KnockoutObservableArray<string> = ko.observableArray([]);
        
        
        /** Display text for PersonStats */
        public personStatsText: KnockoutComputed<string>;
        
        /** Display text for Company */
        public companyText: KnockoutComputed<string>;
        
        
        /** Add object to casesAssigned */
        public addToCasesAssigned = (autoSave?: boolean | null): Case => {
            var newItem = new Case();
            if (typeof(autoSave) == 'boolean'){
                newItem.coalesceConfig.autoSaveEnabled(autoSave);
            }
            newItem.parent = this;
            newItem.parentCollection = this.casesAssigned;
            newItem.isExpanded(true);
            newItem.assignedToId(this.personId());
            this.casesAssigned.push(newItem);
            return newItem;
        };
        
        /** ListViewModel for CasesAssigned. Allows for loading subsets of data. */
        public casesAssignedList: (loadImmediate?: boolean) => ListViewModels.CaseList;
        
        /** Add object to casesReported */
        public addToCasesReported = (autoSave?: boolean | null): Case => {
            var newItem = new Case();
            if (typeof(autoSave) == 'boolean'){
                newItem.coalesceConfig.autoSaveEnabled(autoSave);
            }
            newItem.parent = this;
            newItem.parentCollection = this.casesReported;
            newItem.isExpanded(true);
            newItem.reportedById(this.personId());
            this.casesReported.push(newItem);
            return newItem;
        };
        
        /** ListViewModel for CasesReported. Allows for loading subsets of data. */
        public casesReportedList: (loadImmediate?: boolean) => ListViewModels.CaseList;
        
        
        /** Url for a table view of all members of collection CasesAssigned for the current object. */
        public casesAssignedListUrl: KnockoutComputed<string> = ko.computed(
            () => this.coalesceConfig.baseViewUrl() + '/Case/Table?filter.assignedToId=' + this.personId(),
            null, { deferEvaluation: true }
        );
        
        /** Url for a table view of all members of collection CasesReported for the current object. */
        public casesReportedListUrl: KnockoutComputed<string> = ko.computed(
            () => this.coalesceConfig.baseViewUrl() + '/Case/Table?filter.reportedById=' + this.personId(),
            null, { deferEvaluation: true }
        );
        
        
        /** Pops up a stock editor for object company */
        public showCompanyEditor: (callback?: any) => void;
        
        
        /** Array of all possible names & values of enum title */
        public titleValues: Coalesce.EnumValue[] = [ 
            { id: 0, value: 'Mr' },
            { id: 1, value: 'Ms' },
            { id: 2, value: 'Mrs' },
            { id: 4, value: 'Miss' },
        ];
        
        /** Array of all possible names & values of enum gender */
        public genderValues: Coalesce.EnumValue[] = [ 
            { id: 0, value: 'Non Specified' },
            { id: 1, value: 'Male' },
            { id: 2, value: 'Female' },
        ];
        
        /**
            Methods and properties for invoking server method Rename.
            Sets the FirstName to the given text.
        */
        public readonly rename = new PersonPartial.Rename(this);
        public static Rename = class Rename extends Coalesce.ClientMethod<PersonPartial, ViewModels.Person> {
            public readonly name = 'Rename';
            public readonly verb = 'POST';
            
            /** Calls server method (Rename) with the given arguments */
            public invoke = (name: string | null, callback?: (result: ViewModels.Person) => void, reload: boolean = true): JQueryPromise<any> => {
                return this.invokeWithData({ id: this.parent[this.parent.primaryKeyName](), name: name }, callback, reload);
            };
            
            /** Object that can be easily bound to fields to allow data entry for the method's parameters */
            public args = new Rename.Args(); 
            public static Args = class Args {
                public name: KnockoutObservable<string | null> = ko.observable(null);
            };
            
            /** Calls server method (Rename) with an instance of Rename.Args, or the value of this.args if not specified. */
            public invokeWithArgs = (args = this.args, callback?: (result: ViewModels.Person) => void, reload: boolean = true): JQueryPromise<any> => {
                return this.invoke(args.name(), callback, reload);
            }
            
            /** Invokes the method after displaying a browser-native prompt for each argument. */
            public invokeWithPrompts = (callback?: (result: ViewModels.Person) => void, reload: boolean = true): JQueryPromise<any> | undefined => {
                var $promptVal: string | null = null;
                $promptVal = prompt('Name');
                if ($promptVal === null) return;
                var name: string = $promptVal;
                return this.invoke(name, callback, reload);
            };
            
            protected loadResponse = (data: Coalesce.ItemResult, callback?: (result: ViewModels.Person) => void, reload: boolean = true) => {
                if (!this.result()) {
                    this.result(new ViewModels.Person(data.object));
                } else {
                    this.result().loadFromDto(data.object);
                }
                this.parent.loadFromDto(data.object, true)
                if (typeof(callback) == 'function') {
                    callback(this.result());
                }
            };
        };
        /**
            Methods and properties for invoking server method ChangeSpacesToDashesInName.
            Removes spaces from the name and puts in dashes
        */
        public readonly changeSpacesToDashesInName = new PersonPartial.ChangeSpacesToDashesInName(this);
        public static ChangeSpacesToDashesInName = class ChangeSpacesToDashesInName extends Coalesce.ClientMethod<PersonPartial, void> {
            public readonly name = 'ChangeSpacesToDashesInName';
            public readonly verb = 'POST';
            
            /** Calls server method (ChangeSpacesToDashesInName) with the given arguments */
            public invoke = (callback?: (result: void) => void, reload: boolean = true): JQueryPromise<any> => {
                return this.invokeWithData({ id: this.parent[this.parent.primaryKeyName]() }, callback, reload);
            };
            
            protected loadResponse = (data: Coalesce.ItemResult, callback?: (result: void) => void, reload: boolean = true) => {
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
            Methods and properties for invoking server method FullNameAndAge.
        */
        public readonly fullNameAndAge = new PersonPartial.FullNameAndAge(this);
        public static FullNameAndAge = class FullNameAndAge extends Coalesce.ClientMethod<PersonPartial, string> {
            public readonly name = 'FullNameAndAge';
            public readonly verb = 'GET';
            
            /** Calls server method (FullNameAndAge) with the given arguments */
            public invoke = (callback?: (result: string) => void, reload: boolean = true): JQueryPromise<any> => {
                return this.invokeWithData({ id: this.parent[this.parent.primaryKeyName](),  }, callback, reload);
            };
            
            protected loadResponse = (data: Coalesce.ItemResult, callback?: (result: string) => void, reload: boolean = true) => {
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
            Methods and properties for invoking server method ObfuscateEmail.
        */
        public readonly obfuscateEmail = new PersonPartial.ObfuscateEmail(this);
        public static ObfuscateEmail = class ObfuscateEmail extends Coalesce.ClientMethod<PersonPartial, string> {
            public readonly name = 'ObfuscateEmail';
            public readonly verb = 'PUT';
            
            /** Calls server method (ObfuscateEmail) with the given arguments */
            public invoke = (callback?: (result: string) => void, reload: boolean = true): JQueryPromise<any> => {
                return this.invokeWithData({ id: this.parent[this.parent.primaryKeyName](),  }, callback, reload);
            };
            
            protected loadResponse = (data: Coalesce.ItemResult, callback?: (result: string) => void, reload: boolean = true) => {
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
            Methods and properties for invoking server method ChangeFirstName.
        */
        public readonly changeFirstName = new PersonPartial.ChangeFirstName(this);
        public static ChangeFirstName = class ChangeFirstName extends Coalesce.ClientMethod<PersonPartial, ViewModels.Person> {
            public readonly name = 'ChangeFirstName';
            public readonly verb = 'PATCH';
            
            /** Calls server method (ChangeFirstName) with the given arguments */
            public invoke = (firstName: string | null, title: number | null, callback?: (result: ViewModels.Person) => void, reload: boolean = true): JQueryPromise<any> => {
                return this.invokeWithData({ id: this.parent[this.parent.primaryKeyName](), firstName: firstName, title: title }, callback, reload);
            };
            
            /** Object that can be easily bound to fields to allow data entry for the method's parameters */
            public args = new ChangeFirstName.Args(); 
            public static Args = class Args {
                public firstName: KnockoutObservable<string | null> = ko.observable(null);
                public title: KnockoutObservable<number | null> = ko.observable(null);
            };
            
            /** Calls server method (ChangeFirstName) with an instance of ChangeFirstName.Args, or the value of this.args if not specified. */
            public invokeWithArgs = (args = this.args, callback?: (result: ViewModels.Person) => void, reload: boolean = true): JQueryPromise<any> => {
                return this.invoke(args.firstName(), args.title(), callback, reload);
            }
            
            /** Invokes the method after displaying a browser-native prompt for each argument. */
            public invokeWithPrompts = (callback?: (result: ViewModels.Person) => void, reload: boolean = true): JQueryPromise<any> | undefined => {
                var $promptVal: string | null = null;
                $promptVal = prompt('First Name');
                if ($promptVal === null) return;
                var firstName: string = $promptVal;
                $promptVal = prompt('Title');
                if ($promptVal === null) return;
                var title: number = parseInt($promptVal);
                return this.invoke(firstName, title, callback, reload);
            };
            
            protected loadResponse = (data: Coalesce.ItemResult, callback?: (result: ViewModels.Person) => void, reload: boolean = true) => {
                if (!this.result()) {
                    this.result(new ViewModels.Person(data.object));
                } else {
                    this.result().loadFromDto(data.object);
                }
                this.parent.loadFromDto(data.object, true)
                if (typeof(callback) == 'function') {
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
            this.myId = data.personId;
            this.personId(data.personId);
            // Load the lists of other objects
            if (data.casesAssigned != null) {
                // Merge the incoming array
                Coalesce.KnockoutUtilities.RebuildArray(this.casesAssigned, data.casesAssigned, 'caseKey', Case, this, allowCollectionDeletes);
            }
            if (data.casesReported != null) {
                // Merge the incoming array
                Coalesce.KnockoutUtilities.RebuildArray(this.casesReported, data.casesReported, 'caseKey', Case, this, allowCollectionDeletes);
            }
            if (data.arbitraryCollectionOfStrings != null) {
                this.arbitraryCollectionOfStrings(data.arbitraryCollectionOfStrings);
            }
            if (!data.personStats) { 
                this.personStats(null);
            } else {
                if (!this.personStats()){
                    this.personStats(new PersonStats(data.personStats, this));
                } else {
                    this.personStats()!.loadFromDto(data.personStats);
                }
            }
            if (!data.company) { 
                if (data.companyId != this.companyId()) {
                    this.company(null);
                }
            } else {
                if (!this.company()){
                    this.company(new Company(data.company, this));
                } else {
                    this.company()!.loadFromDto(data.company);
                }
                if (this.parent instanceof Company && this.parent !== this.company() && this.parent.companyId() == this.company()!.companyId())
                {
                    this.parent.loadFromDto(data.company, undefined, false);
                }
            }
            
            // The rest of the objects are loaded now.
            this.title(data.title);
            this.firstName(data.firstName);
            this.lastName(data.lastName);
            this.email(data.email);
            this.gender(data.gender);
            if (data.birthDate == null) this.birthDate(null);
            else if (this.birthDate() == null || this.birthDate()!.valueOf() != new Date(data.birthDate).getTime()){
                this.birthDate(moment(new Date(data.birthDate)));
            }
            if (data.lastBath == null) this.lastBath(null);
            else if (this.lastBath() == null || this.lastBath()!.valueOf() != new Date(data.lastBath).getTime()){
                this.lastBath(moment(new Date(data.lastBath)));
            }
            if (data.nextUpgrade == null) this.nextUpgrade(null);
            else if (this.nextUpgrade() == null || this.nextUpgrade()!.valueOf() != new Date(data.nextUpgrade).getTime()){
                this.nextUpgrade(moment(new Date(data.nextUpgrade)));
            }
            this.name(data.name);
            this.companyId(data.companyId);
            this.arbitraryCollectionOfStrings(data.arbitraryCollectionOfStrings);
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
            dto.personId = this.personId();
            
            dto.title = this.title();
            dto.firstName = this.firstName();
            dto.lastName = this.lastName();
            dto.email = this.email();
            dto.gender = this.gender();
            if (!this.birthDate()) dto.birthDate = null;
            else dto.birthDate = this.birthDate()!.format('YYYY-MM-DDTHH:mm:ss');
            if (!this.lastBath()) dto.lastBath = null;
            else dto.lastBath = this.lastBath()!.format('YYYY-MM-DDTHH:mm:ss');
            if (!this.nextUpgrade()) dto.nextUpgrade = null;
            else dto.nextUpgrade = this.nextUpgrade()!.format('YYYY-MM-DDTHH:mm:ssZZ');
            dto.companyId = this.companyId();
            if (!dto.companyId && this.company()) {
                dto.companyId = this.company()!.companyId();
            }
            dto.arbitraryCollectionOfStrings = this.arbitraryCollectionOfStrings();
            
            return dto;
        }
        
        /** 
            Loads any child objects that have an ID set, but not the full object.
            This is useful when creating an object that has a parent object and the ID is set on the new child.
        */
        public loadChildren = (callback?: () => void): void => {
            var loadingCount = 0;
            // See if this.company needs to be loaded.
            if (this.company() == null && this.companyId() != null) {
                loadingCount++;
                var companyObj = new Company();
                companyObj.load(this.companyId(), () => {
                    loadingCount--;
                    this.company(companyObj);
                    if (loadingCount == 0 && typeof(callback) == "function") { callback(); }
                });
            }
            if (loadingCount == 0 && typeof(callback) == "function") { callback(); }
        };
        
        public setupValidation(): void {
            if (this.errors !== null) return;
            this.errors = ko.validation.group([
                this.firstName.extend({ minLength: 2, maxLength: 75 }),
                this.lastName.extend({ minLength: 3, maxLength: 100 }),
                this.birthDate.extend({ moment: { unix: true } }),
                this.lastBath.extend({ moment: { unix: true } }),
                this.nextUpgrade.extend({ moment: { unix: true } }),
                this.companyId.extend({ required: {params: true, message: "Company is required."} }),
            ]);
            this.warnings = ko.validation.group([
            ]);
        }
        
        constructor(newItem?: object, parent?: Coalesce.BaseViewModel | ListViewModels.PersonList) {
            super(parent);
            this.baseInitialize();
            const self = this;
            
            this.personStatsText = ko.pureComputed(function() {
                if (self.personStats() && self.personStats()!.name()) {
                    return self.personStats()!.name()!.toString();
                } else {
                    return "None";
                }
            });
            this.companyText = ko.pureComputed(function() {
                if (self.company() && self.company()!.altName()) {
                    return self.company()!.altName()!.toString();
                } else {
                    return "None";
                }
            });
            
            
            // List Object model for CasesAssigned. Allows for loading subsets of data.
            var _casesAssignedList: ListViewModels.CaseList;
            this.casesAssignedList = function(loadImmediate = true) {
                if (!_casesAssignedList) {
                    _casesAssignedList = new ListViewModels.CaseList();
                    if (loadImmediate) loadCasesAssignedList();
                    self.personId.subscribe(loadCasesAssignedList)
                }
                return _casesAssignedList;
            }
            function loadCasesAssignedList() {
                if (self.personId()) {
                    _casesAssignedList.queryString = "filter.AssignedToId=" + self.personId();
                    _casesAssignedList.load();
                }
            }
            // List Object model for CasesReported. Allows for loading subsets of data.
            var _casesReportedList: ListViewModels.CaseList;
            this.casesReportedList = function(loadImmediate = true) {
                if (!_casesReportedList) {
                    _casesReportedList = new ListViewModels.CaseList();
                    if (loadImmediate) loadCasesReportedList();
                    self.personId.subscribe(loadCasesReportedList)
                }
                return _casesReportedList;
            }
            function loadCasesReportedList() {
                if (self.personId()) {
                    _casesReportedList.queryString = "filter.ReportedById=" + self.personId();
                    _casesReportedList.load();
                }
            }
            
            
            this.showCompanyEditor = function(callback: any) {
                if (!self.company()) {
                    self.company(new Company());
                }
                self.company()!.showEditor(callback)
            };
            
            self.title.subscribe(self.autoSave);
            self.firstName.subscribe(self.autoSave);
            self.lastName.subscribe(self.autoSave);
            self.email.subscribe(self.autoSave);
            self.gender.subscribe(self.autoSave);
            self.birthDate.subscribe(self.autoSave);
            self.lastBath.subscribe(self.autoSave);
            self.nextUpgrade.subscribe(self.autoSave);
            self.companyId.subscribe(self.autoSave);
            self.company.subscribe(self.autoSave);
            
            if (newItem) {
                self.loadFromDto(newItem, true);
            }
        }
    }
    
    export namespace PersonPartial {
        export enum TitleEnum {
            Mr = 0,
            Ms = 1,
            Mrs = 2,
            Miss = 4,
        }
        export enum GenderEnum {
            NonSpecified = 0,
            Male = 1,
            Female = 2,
        }
    }
}
