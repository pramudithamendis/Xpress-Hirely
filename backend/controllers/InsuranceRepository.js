import Insurance from '../models/insurance.js'

class InsuranceRepository {
  async addInsurance(data) {
    const insurance = new Insurance(data);
    return await insurance.save();
  }

  async getAllInsurances() {
    return await Insurance.find({});
  }

  async getInsuranceById(id) {
    return await Insurance.findById(id);
  }

  async updateInsurance(id, data) {
    return await Insurance.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteInsurance(id) {
    return await Insurance.findByIdAndDelete(id);
  }
}

export default new InsuranceRepository(); // Changed to default export
