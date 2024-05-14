import { asyncHandler } from "../utils/asyncHandler.js";
import { Data } from "../models/Companydatamodel.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getContactData = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) + 1 || 1;
  const searchfield = req.query.searchfield;
  const searchcategory = req.query.searchcategory;
  const filtercriteria = req.query.filtercriteria;
  const isAscending = req.query.isAscending;
  const limit = 10; // Number of items per page
  const skip = (page - 1) * limit;
  let searchvalue =
    searchcategory === "foundedYear" || searchcategory === "Revenue"
      ? parseInt(searchfield)
      : searchfield;


  if (!page)
    return res
      .status(400)
      .json(
        new ApiResponse(400, null, "Page not found", "false" )
      );

  if (page < 1)
    return res
      .status(400)
      .json(
        new ApiResponse(400, null, "Page not found", "false" )
      );

      if(searchcategory=="null" && searchfield!=="null" || searchfield=="null" && searchcategory!=="null"){
        return res.status(400).json(new ApiResponse(400, {message:"Search criteria not found", sucess:"false"}))
      }
      if(filtercriteria=="null" && isAscending!="null" || isAscending=="null" && filtercriteria!="null"){
        return res.status(400).json(new ApiResponse(400, {message:"Filter criteria not found", sucess:"false"}))
      }
      


  //Sort and Search Logic

  if(filtercriteria!="null" &&isAscending!="null" && searchcategory!="null" && searchfield!=="null"){

    const companyData = await Data.aggregate([
      { $match: { [searchcategory]: searchvalue } },
      { $sort: { [filtercriteria]: isAscending === "true" ? 1 : -1 } },

      { $skip: skip || 0 },
      { $limit: limit || 10 },
      {
        $project: {
          _id: 1,
          name: 1,
          Revenue: 1,
          phone: 1,
          website_url: 1,
          foundedYear: 1,
          keywords: 1,
          company_email: 1,
          location: 1,
        },
      },
    ]);

    const totalDocuments = await Data.aggregate([
      { $match: { [searchcategory]: searchvalue } },

      { $count: "totalDocuments" },
    ]);
    const totalDocumentCount = totalDocuments[0].totalDocuments;
    const totalPages = Math.ceil(totalDocumentCount / limit);

    if (totalDocumentCount === 0 || companyData.length === 0) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, null, "Data not found", "false")
        );
    }
    return res.status(200).json(
      new ApiResponse(200, {
        companyData,
        pagination: {
          limit: limit || 10,
          maxpage: totalPages,
          totaldata: totalDocumentCount,
          page,
        },
      })
    );

    

  }

  //search logic
  if (searchfield !== "null" && searchcategory !== "null") {
   

    const companyData = await Data.aggregate([
      { $match: { [searchcategory]: searchvalue } },
      { $skip: skip || 0 },
      { $limit: limit || 10 },
      {
        $project: {
          _id: 1,
          name: 1,
          Revenue: 1,
          phone: 1,
          website_url: 1,
          foundedYear: 1,
          keywords: 1,
          company_email: 1,
          location: 1,
        },
      },
    ]);

 

    const totalDocuments = await Data.aggregate([
      { $match: { [searchcategory]: searchvalue } },
      { $count: "totalDocuments" },
      
    ]);

    
    // Extract the count value
    const totalDocumentCount =
      totalDocuments.length > 0 ? totalDocuments[0].totalDocuments : 0;

    console.log(totalDocumentCount);
    if (totalDocumentCount === 0 || companyData.length === 0) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, null, "Data not found", "false")
        );
    } // This will now contain the count

    const totalPages = Math.ceil(totalDocumentCount / (limit || 10));

    return res.status(200).json(
      new ApiResponse(200, {
        companyData,
        pagination: {
          limit: limit || 10,
          maxpage: totalPages,
          totaldata: totalDocumentCount,
          page,
        },
      })
    );
  }



  //sort logic

  if (isAscending != "null" && filtercriteria != "null") {
    const companyData = await Data.aggregate([
      { $sort: { [filtercriteria]: isAscending === "true" ? 1 : -1 } },
      { $skip: skip || 0 },
      { $limit: limit || 10 },
      {
        $project: {
          _id: 1,
          name: 1,
          Revenue: 1,
          phone: 1,
          website_url: 1,
          foundedYear: 1,
          keywords: 1,
          company_email: 1,
          location: 1,
        },
      },
    ]);
    const totalDocuments = await Data.countDocuments({});
    const totalPages = Math.ceil(totalDocuments / limit);

    if (totalDocuments === 0 || companyData.length === 0) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, null, "Data not found", "false")
        );
    }

    return res.status(200).json(
      new ApiResponse(200, {
        companyData,
        pagination: {
          limit: limit,
          maxpage: totalPages,
          totaldata: totalDocuments,
          page,
        },
      })
    );
  }

  const companyData = await Data.aggregate([
    { $skip: skip },
    { $limit: 10 },
    {
      $project: {
        _id: 1,
        name: 1,
        Revenue: 1,
        phone: 1,
        website_url: 1,
        foundedYear: 1,
        keywords: 1,
        company_email: 1,
        location: 1,
      },
    },
  ]);


  const totalDocuments = await Data.countDocuments({});
  const totalPages = Math.ceil(totalDocuments / limit);
  
  if (totalDocuments === 0 || companyData.length === 0) {
    return res
      .status(404)
      .json(
        new ApiResponse(404, null, "Data not found", "false")
      );
  }

  return res.status(200).json(
    new ApiResponse(200, {
      companyData,
      pagination: {
        limit: limit,
        maxpage: totalPages,
        totaldata: totalDocuments,
        page,
      },
    })
  );
});

export { getContactData };
