import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const dataSchema =new mongoose.Schema({
  name: {
    type: String,
    require:true,
    
  },
  website_url: {
    type: String,
    
  },
  blog_url: {
    type: String
  },
  linkedin_url: {
    type: String
  },
  primary_Number: {
    number: {
      type: String,
      
    },
    source: {
      type: String
    },
    sanitized_number: {
      type: String
    }
  },
  languages: {
    type: [String]
  },
  alexa_ranking: {
    type: Number
  },
  location: {
    type: String
  },
  foundedYear: {
    type: Number,
    require:true
  },
  publiclyTradedSymbol: {
    type: String
  },
  publiclyTradedExchange: {
    type: String
  },
  employeeSize: {
    type: Number
  },
  keywords: {
    type: [String]
  },
  has_intent_signal_account: {
    type: Boolean
  },
  Revenue: {
    type: Number
  },
  icon: {
    type: String
  },
  company_email: {
    type: String
  },
  phone: {
    type: String
  },
  company_address: {
    type: String
  },
  about: {
    type: String
  },
  registered: {
    type: String
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  }
});
dataSchema.plugin(mongooseAggregatePaginate)

export const Data = mongoose.model("Data", dataSchema);

