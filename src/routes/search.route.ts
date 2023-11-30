import { Router  } from "express";
import { verifyError } from "../helpers/verify-error";
import { searchController } from "../controllers";
import { validateJWT, haveRole } from "../middlewares";
import { searchValidator } from "../helpers/search-validation";

export const routerSearch = Router();

routerSearch.post(`/search/:table/:term`, 
                  validateJWT, 
                  haveRole, 
                  searchValidator(), 
                  verifyError,
                  searchController.searchInformation)
