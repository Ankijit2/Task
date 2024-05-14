import { Router } from "express";
import { getContactData } from "../Controller/datacontroller.js";

const router = Router();

router.route("/companydetails").get(getContactData)


export default router