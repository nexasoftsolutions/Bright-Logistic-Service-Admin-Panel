import { defineField, defineType } from "sanity";

export const contactDetailSchema = defineType({
    name: 'contact_detail',
    title: 'Contact Detail',
    type: "document",
    fields: [
        defineField({
            name: "director_name",
            title: "Director Name",
            type: "string",
            validation: (rule) => rule.required().error("Director name is required")
        }),
        defineField({
            name: "director_contact_number",
            title: "Director Contact Number",
            type: "number",
            validation: (rule) => rule.required().error("Director number is required")
        }),
        defineField({
            name: "headquater_location",
            title: "Headquater Location",
            type: "string",
            validation: (rule) => rule.required().error("Headquater location is required")
        }),
        defineField({
            name: "whatsapp_number",
            title: "Whatsapp Number",
            type: "string",
            validation: (rule) => rule.required().error("Whatsapp number is required")
        }),
        defineField({
            name: "main_office_number",
            title: "Main Office Number",
            type: "string",
            validation: (rule) => rule.required().error("Main Office number is required")
        }),
    ]
})