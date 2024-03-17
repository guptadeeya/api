import express from "express";
import {signup} from "../controllers/auth.controller.js";
// const express = require("express");

const router = express.Router()

router.post('/signup', signup)

export default router