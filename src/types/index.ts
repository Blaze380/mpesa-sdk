export type ApiConfig = {
    apiKey?: string;
    publicKey?: string;
    bearerToken?: string;
    useSSL?: boolean;
    webhook?: boolean;
    serviceProviderCode: string;
}

export type RequestParams = {
    input_ThirdPartyReference?: string;
    input_QueryReference?: string;
    input_ServiceProviderCode?: string;
    input_TransactionReference?: string;
    input_CustomerMSISDN?: string;
    input_Amount?: string;
    input_PrimaryPartyCode?: string;
    input_ReceiverPartyCode?: string;
    input_SecurityCredential?: string;
    input_InitiatorIdentifier?: string;
    input_ReversalAmount?: string;
    input_TransactionID?: string;
    // [key: string]: string | undefined;

}

/**
 * C2B
 */
export type C2BParams = Omit<RequestParams, "input_TransactionID" | "input_ReversalAmount" | "input_InitiatorIdentifier" | "input_SecurityCredential" | "input_ServiceProviderCode" | "input_QueryReference" | "input_PrimaryPartyCode" | "input_ReceiverPartyCode">;
export type SyncC2B = Omit<SyncResponse, "output_ResponseTransactionStatus" | "output_CustomerName" | "output_error">

/**
 * B2C
 */
export type B2CParams = Omit<RequestParams, "input_TransactionID" | "input_ReversalAmount" | "input_InitiatorIdentifier" | "input_SecurityCredential" | "input_ServiceProviderCode" | "input_QueryReference" | "input_PrimaryPartyCode" | "input_ReceiverPartyCode">;
export type SyncB2C = Omit<SyncResponse, "output_ResponseTransactionStatus" | "output_CustomerName" | "output_error">;

/**
 * B2B
 */
export type B2BParams = Omit<RequestParams, "input_TransactionID" | "input_ReversalAmount" | "input_InitiatorIdentifier" | "input_SecurityCredential" | "input_ServiceProviderCode" | "input_QueryReference" | "input_PrimaryPartyCode" | "input_CustomerMSISDN">;
export type SyncB2B = Omit<SyncResponse, "output_ResponseTransactionStatus" | "output_CustomerName" | "output_error">;
export type AsyncB2B = Omit<AsyncResponse, "input_ResponseTransactionStatus">;

/**
 * Reversal Transaction
 */
export type ReversalParams = Omit<RequestParams,
    "input_ReceiverPartyCode" |
    "input_ServiceProviderCode" |
    "input_QueryReference" |
    "input_PrimaryPartyCode" |
    "input_CustomerMSISDN" |
    "input_TransactionReference" |
    "input_Amount"
>;
export type SyncReversal = Omit<SyncResponse, "output_ResponseTransactionStatus" | "output_CustomerName" | "output_error">;

/**
 * Query Transactions status
 */
export type QueryTransactionStatusParams = Omit<RequestParams,
    "input_ReceiverPartyCode" |
    "input_ServiceProviderCode" |
    "input_PrimaryPartyCode" |
    "input_CustomerMSISDN" |
    "input_TransactionReference" |
    "input_Amount" |
    "input_TransactionID" |
    "input_ReversalAmount" |
    "input_InitiatorIdentifier" |
    "input_SecurityCredential"
>;

export type SyncTransactionStatus = Omit<SyncResponse, "output_CustomerName" | "output_TransactionID" | "output_error">;
/**
 * Query Customer Name
 */
export type CustomerNameParams = Omit<RequestParams, "input_Amount" | "input_QueryReference" | "input_TransactionReference">
export type SyncCustomerName = Omit<SyncResponse, "output_ResponseTransactionStatus" | "output_TransactionID" | "output_error">

export type ResponseCodes = | 'INS-0'
    | 'INS-1'
    | 'INS-2'
    | 'INS-4'
    | 'INS-5'
    | 'INS-6'
    | 'INS-9'
    | 'INS-10'
    | 'INS-13'
    | 'INS-14'
    | 'INS-15'
    | 'INS-16'
    | 'INS-17'
    | 'INS-18'
    | 'INS-19'
    | 'INS-20'
    | 'INS-21'
    | 'INS-22'
    | 'INS-23'
    | 'INS-24'
    | 'INS-25'
    | 'INS-26'
    | 'INS-993'
    | 'INS-994'
    | 'INS-995'
    | 'INS-996'
    | 'INS-997'
    | 'INS-998'
    | 'INS-2001'
    | 'INS-2002'
    | 'INS-2006'
    | 'INS-2051'
    | 'INS-2057';
export type SyncResponse = {
    output_ConversationID?: string;
    output_TransactionID?: string;
    output_ResponseDesc?: ResponseCodes
    output_ResponseCode?: string;
    output_ThirdPartyReference?: string;
    output_ResponseTransactionStatus?: "Cancelled" | "Completed" | "Expired" | "N/A";
    output_CustomerName?: string;
    output_error?: string;
}

export type AsyncResponse = {
    input_OriginalConversationID?: string;
    input_ThirdPartyReference?: string;
    input_TransactionID?: string;
    input_ResultCode?: string;
    input_ResultDesc?: string;
    input_ResponseTransactionStatus?: "Cancelled" | "Completed" | "Expired" | "N/A";
    replyMpesa: (params: AsyncResponseAfterRequest) => Promise<void>;
}

export type AsyncResponseAfterRequest = {
    output_OriginalConversationID: string;
    output_ResponseDesc: string;
    output_ResponseCode: string;
    output_ThirdPartyConversationID: string;
}