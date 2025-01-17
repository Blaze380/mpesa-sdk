import dotenv from "dotenv";
import { ApiConfig, SyncC2B, ResponseCodes } from "../src/types";
import { MpesaClient } from "../src"
dotenv.config();
let config: ApiConfig;
let phoneNumber: string;
let mpesa: MpesaClient;
beforeAll((): void => {
    config = {
        serviceProviderCode: "171717",
        apiKey: process.env.MPESA_API_KEY,
        publicKey: process.env.MPESA_PUBLIC_KEY
    };
    mpesa = new MpesaClient(config);
    phoneNumber = process.env.TEST_PHONE_NUMBER!;
})


describe("Send Money to customer(C2B)", (): void => {
    it("Should send money correctly returning success code", async (): Promise<void> => {
        const res: SyncC2B = await mpesa.c2b({
            input_Amount: "100",
            input_CustomerMSISDN: phoneNumber,
            input_ThirdPartyReference: "T12344C",
            input_TransactionReference: "11114",
        });
        console.log(res);
        expect(res.output_ResponseCode).toEqual("INS-0" as ResponseCodes);
    });
});