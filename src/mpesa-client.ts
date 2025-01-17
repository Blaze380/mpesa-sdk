import { ApiConfig, AsyncResponse, AsyncResponseAfterRequest, B2BParams, B2CParams, C2BParams, CustomerNameParams, QueryTransactionStatusParams, RequestParams, ReversalParams, SyncB2B, SyncB2C, SyncC2B, SyncCustomerName, SyncResponse, SyncReversal, SyncTransactionStatus } from "./types";
import crypto from "crypto";
import fetch, { Headers } from "cross-fetch";
import constants from 'constants';
export class MpesaClient {

    private readonly apiConfig: ApiConfig;
    private readonly baseUrl: string;
    private readonly origin: string;
    private readonly headers: Headers;
    constructor (config: ApiConfig) {
        this.apiConfig = config;
        this.baseUrl = "https://api.sandbox.vm.co.mz";
        this.origin = "https://developer.mpesa.vm.co.mz";
        this.headers = new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${ this.apiConfig.bearerToken }`,
            Origin: this.origin,
        })
        if (!this.apiConfig.apiKey || !this.apiConfig.publicKey)
            throw new Error("You Have to provide your Api key and your public key.");

        if (!this.apiConfig.bearerToken)
            this.apiConfig.bearerToken = MpesaClient.generateBearerToken(this.apiConfig.apiKey, this.apiConfig.publicKey);
    }
    public static generateBearerToken (apiKey: string, publicKey: string): string {
        publicKey = `-----BEGIN PUBLIC KEY-----\n ${ publicKey } \n-----END PUBLIC KEY-----`;
        const buffer = Buffer.from(apiKey);
        const encrypted = crypto.publicEncrypt({
            'key': publicKey,
            'padding': constants.RSA_PKCS1_PADDING,
        },
            buffer);
        return encrypted.toString("base64");

    }
    private getUrl (path: string, port?: string): string {
        port = port ? ":" + port : "";
        return this.baseUrl + port + path;
    }

    private async post (url: string, body: any): Promise<any> {
        return await fetch(url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
    }
    private async put (url: string, body: any): Promise<any> {
        return await fetch(url, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify(body)
        })
    }
    private async get (url: string): Promise<any> {
        return await fetch(url, {
            method: "GET",
            headers: this.headers,
        })
    }

    private getStringParams (params: RequestParams): string {
        return Object.entries(params)
            .filter(([key, value]: [string, string]): boolean => key in params && value !== undefined)
            .map(([key, value]: [string, string]): string => `${ key }=${ value }`)
            .join("&")
            .replace(/^/, "?");
    }
    public async queryTransactionStatus (params: QueryTransactionStatusParams): Promise<SyncTransactionStatus> {
        params = this.addServiceCodeIntoBody(params);
        const url: string = this.getUrl("/ipg/v1x/queryTransactionStatus" + this.getStringParams(params), "18353");
        const res: any = await this.get(url);
        return await res.json();

    }

    public async c2b (params: C2BParams): Promise<SyncC2B> {
        console.log(this.apiConfig.bearerToken);
        const url: string = this.getUrl("/ipg/v1x/c2bPayment/singleStage/", "18352");
        params = this.addServiceCodeIntoBody(params);
        const res: any = await this.post(url, params);
        return await res.json();
    }
    public async b2c (params: B2CParams): Promise<SyncB2C> {
        const url: string = this.getUrl("/ipg/v1x/b2cPayment/", "18345");
        params = this.addServiceCodeIntoBody(params);
        const res: any = await this.post(url, params);
        return await res.json()
    }
    public async b2b (params: B2BParams): Promise<SyncB2B> {
        const url: string = this.getUrl("/ipg/v1x/b2bPayment/", "18349");
        params = this.addServiceCodeIntoBody(params, "partycode");
        const res: any = await this.post(url, params);
        return await res.json()
    }
    public async reversalTransaction (params: ReversalParams): Promise<SyncReversal> {
        const url: string = this.getUrl("/ipg/v1x/reversal/", "18354");
        params = this.addServiceCodeIntoBody(params);
        const res: any = await this.put(url, params);
        return await res.json()
    }
    /**
     * @alpha Is bugy
     * @param params
     * @returns
     */
    public async queryCustomerName (params: CustomerNameParams): Promise<SyncCustomerName | AsyncResponse> {
        params = this.addServiceCodeIntoBody(params);
        const url: string = this.getUrl("/ipg/v1x/queryCustomerName" + this.getStringParams(params), "19323");
        const res: any = await this.get(url);
        return await res.json();

    }
    /**
     * Inserts service short code into the body object
     * @param params
     * @returns
     */

    private addServiceCodeIntoBody (params: RequestParams, type: "service" | "partycode" = "service"): RequestParams {
        if (type === "service")
            params.input_ServiceProviderCode = this.apiConfig.serviceProviderCode;
        else if (type === "partycode")
            params.input_PrimaryPartyCode = this.apiConfig.serviceProviderCode;
        return params;
    }

    /**
     * @deprecated
     * @param url
     * @returns
     */
    private getReplyMpesa (url: string): (params: AsyncResponseAfterRequest) => Promise<void> {
        return async (params: AsyncResponseAfterRequest): Promise<void> => { }
    }
}
