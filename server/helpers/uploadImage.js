import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();
const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = process.env;
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});
const extensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
/**
 * This class contains
 * all methods required to save
 * the accommodation's data
 */
class ImageUploader {
/**
     *
     * @param {*} images
     * @returns {string} url
     */
  static async uploadImage(images) {
    const imgExt = images.name.split('.').pop();
    if (extensions.includes(imgExt)) {
      const result = await cloudinary.uploader.upload(images.path);
      return result.url;
    }
    return null;
  }

  /**
   *
   * @param {*} images
   * @returns {string} url
   */
  static async uploader(images) {
    let uploaded;
    let combinedLinks = '';
    if (!images.length) {
      uploaded = await this.uploadImage(images);
      return uploaded;
    } if (images.length) {
      const arr = images;
      for (let i = 0; i < arr.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        uploaded = await this.uploadImage(arr[i]);
        combinedLinks += `${uploaded}, `;
      }
      return combinedLinks;
    }
  }
}
export default ImageUploader;
