// import files
import express from "express";
import { body } from "express-validator";
import Subject_controllers from "../Controllers/Subject_controllers.js";
import Verify_User from "./../Utils/Verify_User.js";
import JWT from "../Utils/JWT.js";

const Router = express.Router();

// Routes Handelar /API/Subjects?Page=""?Limit=""
Router.route("/").post(
  [
    body("_id").notEmpty().withMessage("_id is not Valid"),
    body("Token").notEmpty().withMessage("Token is not Valid"),
  ],
  Subject_controllers.Get_All_Subjects
);

// ADD SUBJECT
Router.route("/add").post(
  // JWT.Verify_Token,
  // Verify_User("INSTRUCTOR"),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("credit_hours").notEmpty().withMessage("Credit hours required"),
    body("time").notEmpty().withMessage("Time required"),
    body("day").notEmpty().withMessage("Day required"),
    body("instructor_id").notEmpty().withMessage("Instructor ID required"),
  ],
  Subject_controllers.Add_Subject
);

// Routes Handelar /API/Subjects/Instructor/InstructorSubjects
Router.route("/Instructor/InstructorSubjects").post(
  JWT.Verify_Token,
  Verify_User("INSTRUCTOR"),
  [body("instructor_id").notEmpty().withMessage("instructor id is not Valid")],
  Subject_controllers.Get_Instructor_Subjects
);

export default Router;
