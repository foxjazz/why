export interface Istringdistance {
    prop: string;
    list: Array<Object>;
    input: string;

}
interface Iobj {
    o: Object;
    distance: number;
}

class tobeOrderedList {
    public olist: Array<Iobj>;
    constructor() {
        this.olist = new Array<Iobj>();
    }
    
}
class orderedList {
    olist: Array<Iobj>;
}
export class stringdistance{
    public result: Array<Object>;
    private presult: Array<Iobj>;
    constructor(sdinput: Istringdistance) { this.orderList(sdinput); }
    public getNewList(): Array<Object>{ return this.result;}
    private indexPropByPath(object: any, path: string): string {
        let result: string;
        let obj = object;
        let ii=0;
        for (const portion of path.split(".")) {
               obj = obj[portion];
        }
        result = obj;
        return result;
    }

    private orderList(data: Istringdistance) {
        let arr: Array<Object>;
        arr = data.list;
        if (arr == null || arr.length === 0 ) {
            throw ('invalid data');
        }
        let n: number;
        let tobeo = new tobeOrderedList();
        let olst = new Array<Iobj>();
        let i: number;
        let sresult: string;
        for (i = 0; i < arr.length; i++)
        {
            let sresult = this.indexPropByPath(arr[i], data.prop);

            let nd: Iobj = {distance: this.distance(data.input, sresult), o: arr[i]};
            olst.push(nd);
        }
        this.presult = olst.sort((a, b) => {
            if (a.distance < b.distance) return -1;
            if (a.distance > b.distance) return 1;
            return 0;
        });
        this.result = new Array<Object>();
        for(let obj of this.presult)
        {
            this.result.push(obj.o);
        }
        //Here we need to order the list and assign it to result.
    }

    private distance(s1: string, s2: string): number {
    
    /* return max value of data type Number on error */
    if (!s1 || !s2) {
        return Number.MAX_VALUE;
    }

    let m: number = s1.length;
    let n: number = s2.length;
    let i: number;
    let j: number;
    let cost: number = 0;
    let matrix: Array<number>[] = new Array();

    /*
     * for all i and j, matrix[i][j] holds the edit distance between the
     * first i characters of s and the first j characters of t.
     *
     * @note
     * Array has (m + 1) * (n + 1) values
     */
    for (i = 0; i <= m; i++) {
        matrix[i] = new Array();
        matrix[i][0] = i;
    }
    for (j = 0; j <= n; j++) {
        matrix[0][j] = j;
    }

    /* determine longest common substring sequence */
    for (j = 1; j <= n; j++) {
        for (i = 1; i <= m; i++) {
            /* subtract one to start, at zero index */
            cost = (s1.charAt(i - 1) == s2.charAt(j - 1)) ? 0 : 1;

            /* insert, delete, substitute */
            matrix[i][j] = Math.min(matrix[i][j - 1] + 1,
                Math.min(matrix[i - 1][j] + 1,
                    matrix[i - 1][j - 1] + cost));
        }
    }

    /* return edit distance */
    return matrix[m][n];
}
}
