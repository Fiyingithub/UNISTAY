import axios from "axios";
// import logger from "../Utils/Logger.js";

const downloadBusinessUpload = async (req, res) => {
  try {
    const { businessDocumentUploadString } = req.params;
    const { id: userId } = req.user;

    // Verify user owns this income record
    const income = await User.findOne({
      where: { id: businessDocumentUploadString, userId: userId },
    });

    if (!income || !income.businessDocumentUploadString) {
      return res.status(404).json({
        status: false,
        message: "File not found",
      });
    }

    // Get image from Cloudinary
    const response = await axios({
      method: "GET",
      url: income.businessDocumentUploadString,
      responseType: "stream",
    });

    // Set headers for download
    const filename = `receipt_${businessDocumentUploadString}.jpg`;
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", response.headers["content-type"]);

    // Pipe the image data to response
    response.data.pipe(res);
  } catch (error) {
    logger.info("Download error:", error);
    res.status(500).json({
      status: false,
      message: "Download failed",
    });
  }
};

export default downloadBusinessUpload
;
