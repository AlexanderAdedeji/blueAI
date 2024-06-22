import * as z from "zod"




export const formSchema = z.object({
    prompt:z.string().min(1, {
        message: "Please enter a prompt"
    })
})


export type FormSchemaInterface = z.infer<typeof formSchema>