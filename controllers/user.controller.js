import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { ROLES } from "../constants/role.constant.js";
import bcrypt from "bcryptjs";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const signup = async (req, res) => {
  try {
    const {
      fullname,
      email,
      phoneNumber,
      username,
      password,
      role,
      businessName,
      businessDocumentUploadString,
      university,
      matricNumber,
    } = req.body;

    const checkUser = await User.findOne({ where: { email } });

    if (checkUser) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const payload = {
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      username,
      role,
    };

    // Image Upload
    const file = req.file;
    let imageString = null;

    if (file) {
      imageString = await uploadToCloudinary(
        req.file.buffer,
        req.file.originalname
      );
    }

    // check field for landlord and students
    if (role === ROLES.LANDLORD) {
      if (!businessName || businessDocumentUploadString) {
        return res
          .status(400)
          .json({ message: "All landlord fields are required" });
      }
      payload.businessName = businessName;
      payload.businessDocumentUploadString = imageString;
    } else if (role === ROLES.STUDENT) {
      if (!university || !matricNumber) {
        return res
          .status(400)
          .json({ message: "All Student fields are required" });
      }
      payload.university = university;
      payload.matricNumber = matricNumber;
    }

    const user = await User.create(payload);

    const userDto = {
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      username: user.username,
      businessName: user.businessName,
      businessDocumentUploadString: user.businessDocumentUploadString,
      university: user.university,
      matricNumber: user.matricNumber,
      role: user.role,
    };

    res.status(201).json({
      status: 201,
      error: false,
      message: "User Created successfully",
      user: userDto,
    });
  } catch (error) {
    // console.log(error.message)
    return res.status(500).json({
      status: 500,
      error: true,
      message: "An error occurred",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({
      status: 400,
      error: true,
      message: "User does not exist",
    });
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return res.status(400).json({
      status: 400,
      error: true,
      message: "Password does not match",
    });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1hr" }
  );

  const userDto = {
    fullname: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    username: user.username,
    businessName: user.businessName,
    businessDocumentUploadString: user.businessDocumentUploadString,
    university: user.university,
    matricNumber: user.matricNumber,
    role: user.role,
  };

  res.status(200).json({
    status: 200,
    error: false,
    message: "User Login successfully",
    user: userDto,
    token,
  });
};
