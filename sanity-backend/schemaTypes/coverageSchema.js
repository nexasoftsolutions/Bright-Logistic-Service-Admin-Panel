import { defineField, defineType } from "sanity";

export const coverageSchema = defineType({
    name: 'coverage',
    title: 'Coverage',
    type: "document",
    fields: [
        defineField({
            name: "city_name",
            title: "City Name",
            type: "string",
            validation: (rule) => rule.required().error("City name is required")
        }),
        defineField({
            name: "city_speciality",
            title: "City Speciality",
            type: "number",
            validation: (rule) => rule.required().error("City speciality is required")
        })
    ]
})