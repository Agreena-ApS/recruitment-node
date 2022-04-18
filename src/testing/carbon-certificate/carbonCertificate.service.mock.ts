export const mockCarbonCertificateService = () => ({
    getAvailableCarbonCertificates: jest.fn(),
    getOwnedCarbonCertificatesByUser: jest.fn(),
    transferCarbonCertificate: jest.fn()
});
