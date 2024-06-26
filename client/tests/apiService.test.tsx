import createFetchMock from "vitest-fetch-mock";
import apiService from "../src/services/apiService";
import { describe, expect, vi } from "vitest";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const subsMock = [
  {
    _id: "124",
    name: "bla bla",
    billingDate: "2024-03-12T00:00:00.000Z",
    cost: 10,
    status: true,
  },
  {
    _id: "123",
    name: "bla bla bla",
    billingDate: "2024-04-13T00:00:00.000Z",
    cost: 12,
    status: true,
  },
];
const notifsMock = [
  {
    _id: "125",
    message: "bla bla",
    date: "2024-03-12T00:00:00.000Z",
    read: false,
  },
  {
    _id: "126",
    message: "bla bla bla",
    date: "2024-04-13T00:00:00.000Z",
    read: false,
  },
];

beforeEach(() => {
  fetchMocker.resetMocks();
});

describe("Fetching Subscriptions", () => {
  it("should return a valid array of subscriptions", async () => {
    fetchMocker.mockResponse((req) => {
      console.log(req.url);
      return JSON.stringify({ data: subsMock });
    });
    const response = await apiService.fetchSubscriptions();
    expect(fetchMocker).toHaveBeenCalled();
    expect(response).toEqual(subsMock);
  });
  it("should return an error message if the call fails", async () => {
    // fetchMocker.mockReject({new Error("fake message")});
    fetchMocker.mockResponse((req) => {
      console.log(req.url);
      return {
        status: 500,
        body: JSON.stringify({ errors: { message: "testing" } }),
      };
    });
    expect(() => apiService.fetchSubscriptions()).rejects.toThrowError();
  });
});

describe("adding subscriptions", () => {
  it("should return a valid subscription that was added", async () => {
    const { _id, ...input } = subsMock[0];
    fetchMocker.mockResponse(async (req) => {
      expect(req.method).toBe("POST");
      const body = await req.json();
      body._id = _id;
      return JSON.stringify({ data: body });
    });
    const response = await apiService.addSubscription(input);
    expect(fetchMocker).toHaveBeenCalled();
    expect(response).toEqual(subsMock[0]);
  });

  it("Should return an error if it could not be added", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...input } = subsMock[0];
    fetchMocker.mockResponse(async (req) => {
      expect(req.method).toBe("POST");
      return {
        status: 400,
        body: JSON.stringify({ errors: { message: "missing values" } }),
      };
    });
    expect(() => apiService.addSubscription(input)).rejects.toThrowError(
      "missing values"
    );
    expect(fetchMocker).toHaveBeenCalled();
  });

  it("should throw an error if no subscription is returned with a 200 code", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...input } = subsMock[0];
    fetchMocker.mockResponse(async (req) => {
      expect(req.method).toBe("POST");
      return JSON.stringify({ data: undefined });
    });
    expect(() => apiService.addSubscription(input)).rejects.toThrowError(
      "Unable to verify subscription was added"
    );
    expect(fetchMocker).toHaveBeenCalled();
  });
});

describe("Updating Subscription", () => {
  it("should correctly send an update", async () => {
    fetchMocker.mockResponse(async (req) => {
      expect(req.method).toBe("PUT");
      expect(req.url.endsWith("123")).toBe(true);
      const body = await req.json();
      return {
        status: 200,
        body: JSON.stringify({ data: body }),
      };
    });
    const data = {
      name: "bla bla bla squared",
      billingDate: "2025-04-13T00:00:00.000Z",
      cost: 12,
      status: true,
    };
    const response = await apiService.updateSubscription("123", data);
    expect(response).toEqual(data);
  });
  it("if sending an update fails should return an error", () => {
    fetchMocker.mockResponse((req) => {
      expect(req.method).toBe("PUT");
      expect(req.url.endsWith("123")).toBe(true);
      return {
        status: 500,
        body: JSON.stringify({ errors: { message: "testing" } }),
      };
    });
    const data = {
      name: "bla bla bla squared",
      billingDate: "2025-04-13T00:00:00.000Z",
      cost: 12,
      status: true,
    };
    expect(() =>
      apiService.updateSubscription("123", data)
    ).rejects.toThrowError("testing");
  });
});

describe("Fetch Notification", () => {
  it("should correctly fetch notifications", async () => {
    fetchMocker.mockResponse((req) => {
      expect(req.method).toBe("GET");
      return JSON.stringify({ data: notifsMock });
    });
    const response = await apiService.fetchNotifications();
    expect(fetchMocker).toHaveBeenCalledOnce();
    expect(response).toEqual(notifsMock);
  });
  it("should handle error responses", () => {
    fetchMocker.mockResponse((req) => {
      expect(req.method).toBe("GET");
      return {
        status: 500,
        body: JSON.stringify({ errors: { message: "The backend failed" } }),
      };
    });
    expect(() => apiService.fetchNotifications()).rejects.toThrowError(
      "The backend failed"
    );
  });
});

describe("Deleting Subscription", () => {
  it("should correctly send a delete", async () => {
    fetchMocker.mockResponse(async (req) => {
      expect(req.method).toBe("DELETE");
      expect(req.url.endsWith("123")).toBe(true)
      return {
        status: 200,
        body: JSON.stringify({ data: data })
      };
    });
    const data = subsMock[1];
    const response = await apiService.deleteSubscription(data._id);
    expect(response).toEqual(data);
  })
  it("should throw an error if delete request fails", () => {
    fetchMocker.mockResponse((req) => {
      expect(req.method).toBe("DELETE");
      expect(req.url.endsWith("123")).toBe(true);
      return {
        status: 500,
        body: JSON.stringify({ errors: { message: "testing" } }),
      };
    });
    expect(() =>
      apiService.deleteSubscription("123")
    ).rejects.toThrowError("testing");
  })
})