import { z} from "zod";

export const formSchema: any = z.object({
    text: z.string().min(2, { message: "Value must be at least 2 characters long" }),
}).required();