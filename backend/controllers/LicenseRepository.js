import License from '../models/License.js'

class LicenseRepository {
  async addLicense(data) {
    const license = new License(data);
    return await license.save();
  }

  async getAllLicenses() {
    return await License.find({});
  }

  async getLicenseById(id) {
    return await License.findById(id);
  }

  async updateLicense(id, data) {
    return await License.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteLicense(id) {
    return await License.findByIdAndDelete(id);
  }
}

export default new LicenseRepository(); // Changed to default export
