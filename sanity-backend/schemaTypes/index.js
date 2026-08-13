import { contactDetailSchema } from "./ContactDetailSchema";
import { industriesSchema } from "./industriesSchema";
import { coverageSchema } from "./coverageSchema";
import { servicesSchema } from "./serviceSchema";
import { gallerySchema } from "./gallerySchema";
import { quotesSchema } from "./quotesSchema";
import { adminSchema } from "./adminSchema";
import { fleetSchema } from "./fleetSchema";

export const schemaTypes = [
    adminSchema, 
    gallerySchema, 
    fleetSchema, 
    servicesSchema, 
    coverageSchema, 
    industriesSchema,
    quotesSchema,
    contactDetailSchema
]