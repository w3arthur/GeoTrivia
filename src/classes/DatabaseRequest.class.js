export default class DatabaseRequest{
    #axiosFunction; #goodResult; #failResult;
    constructor(axiosFunction) { this.#axiosFunction = axiosFunction; }
    GoodResult = (goodResult) => { this.#goodResult = goodResult; return this; }
    BadResult = (failResult) => { this.#failResult = failResult; return this; }
    Build = () => {
        if (typeof(this.#axiosFunction) !== 'function' ||  typeof(this.#goodResult) !== 'function' ) {alert('no functions entered inside axios');return;}
        if(typeof(this.#failResult) !== 'function') this.#failResult = () => {return;};
        (async() =>
            await databaseRequest( 
                () => this.#axiosFunction()
                , (result) => this.#goodResult(result)
                , (error) => this.#failResult(error)
            )
        )()
    }
}

async function databaseRequest(axiosFunction, goodResult, failResult){
        try{
        const result = await axiosFunction();
        if(await result) await goodResult(result)
        else throw new Error();
        console.log('result ',result);    //to delete
        }catch(error){ await failResult(error);}
    }
