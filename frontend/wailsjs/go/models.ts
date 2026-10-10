export namespace main {
	
	export class Domain {
	    Url: string;
	    IsBlocked: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Domain(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Url = source["Url"];
	        this.IsBlocked = source["IsBlocked"];
	    }
	}

}

