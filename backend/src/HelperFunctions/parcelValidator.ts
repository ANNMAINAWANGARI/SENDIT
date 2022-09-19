import Joi from 'joi'

export const ParcelSchema= Joi.object({
    parcel_type:Joi.string().required(),
    parcel_destination:Joi.string().required(),
    parcel_origin:Joi.string().required(),
    parcel_destination_phone:Joi.string().required(),
    parcel_origin_phone:Joi.string().required(),
    parcel_weight:Joi.number().required(),
    parcel_status:Joi.string().required(),
    user_id:Joi.string().required(),
   
})

