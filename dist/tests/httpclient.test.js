import axios from "axios";
import { httpClient } from "../src/httpclient";
jest.mock("axios");
const mockedAxios = axios;
describe("httpClient module", () => {
    beforeEach(() => jest.clearAllMocks());
    it("should make a GET request", async () => {
        mockedAxios.get.mockResolvedValue({ data: "ok" });
        const res = await httpClient.get("http://api.com", "test");
        expect(res?.data).toBe("ok");
        expect(mockedAxios.get).toHaveBeenCalledWith("http://api.com/test", {});
    });
    it("should resolve base URL from environment variable", async () => {
        const env = { API_URL: "http://api.com" };
        process.env = env;
        const res = await httpClient.get("API_URL", "test");
        expect(res?.data).toBe("ok");
        expect(mockedAxios.get).toHaveBeenCalledWith("http://api.com/test", {});
    });
    it("should make a POST request", async () => {
        mockedAxios.post.mockResolvedValue({ data: { success: true } });
        const res = await httpClient.post("http://api.com", "data", { key: "value" });
        expect(res?.data.success).toBe(true);
    });
    it("should throw an error for failed request", async () => {
        mockedAxios.get.mockRejectedValue({
            message: "fail",
            response: { data: { message: "Not found" } },
        });
        await expect(httpClient.get("http://api.com", "/fail")).rejects.toThrow();
    });
    it("should pass custom headers in config", async () => {
        mockedAxios.get.mockResolvedValue({ data: "headers ok" });
        const config = { headers: { Authorization: "Bearer token" } };
        await httpClient.get("http://api.com", "with-auth", config);
        expect(mockedAxios.get).toHaveBeenCalledWith("http://api.com/with-auth", config);
    });
    it('should make a PUT request', async () => {
        mockedAxios.put.mockResolvedValue({ data: { updated: true } });
        const res = await httpClient.put('http://api.com', 'item/1', { name: 'New' });
        expect(res?.data.updated).toBe(true);
    });
    it('should make a DELETE request', async () => {
        mockedAxios.delete.mockResolvedValue({ data: { deleted: true } });
        const res = await httpClient.delete('http://api.com', 'item/1');
        expect(res?.data.deleted).toBe(true);
    });
    it('should throw if environment variable is missing', () => {
        process.env = {};
        expect(() => httpClient.get('MISSING_API', '')).rejects.toThrow('Base URL "MISSING_API" not found');
    });
    it('should handle non-Axios errors', async () => {
        mockedAxios.get.mockRejectedValue(new Error('Unexpected'));
        await expect(httpClient.get('http://api.com', 'oops')).rejects.toThrow('Unexpected');
    });
});
