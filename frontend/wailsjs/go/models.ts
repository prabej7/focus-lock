export namespace main {
	
	export class Domain {
	    url: string;
	    isBlocked: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Domain(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.url = source["url"];
	        this.isBlocked = source["isBlocked"];
	    }
	}

}

