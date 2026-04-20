/* eslint-disable @typescript-eslint/no-explicit-any */
import { bodySendToPost } from "@/zod/joinInvoiceAndFreelanceDataSchema";

export const isTypeJoinInvoice = (value: unknown): value is bodySendToPost => 
    typeof value === "object" &&
    typeof (value as any).name === "string" &&
    typeof (value as any).lastName === "string" &&
    typeof (value as any).id === "number" &&
    typeof (value as any).createdAt === "string" &&
    typeof (value as any).numInvoice === "string" &&
    typeof (value as any).taxable === "string" &&
    typeof (value as any).vat === "string" &&
    typeof (value as any).total === "string" &&
    typeof (value as any).creationDate === "string" &&
    typeof (value as any).taxIdCode === "string"
;