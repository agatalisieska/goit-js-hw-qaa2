// moj kod dla GET /cookies/delete
describe("httpbin tests1", () => {
  it("response code should be 200", () => {
    cy.request("https://httpbin.org/cookies/delete?freeform=").then(
      (response) => {
        const status = response.status;
        assert.equal(200, status);
      }
    );
  });
});

// moj kod dla GET /base64/{value}
describe("httpbin tests2", () => {
  it("response code should be 200", () => {
    cy.request("https://httpbin.org/base64/SFRUUEJJTiBpcyBhd2Vzb21l").then(
      (response) => {
        const status = response.status;
        assert.equal(200, status);
      }
    );
  });
});

// moj kod dla GET Method
describe("httpbin tests3", () => {
  it("response code should be 200", () => {
    cy.request("GET", "https://httpbin.org/get").then((response) => {
      expect(response.body).to.have.property("url");
    });
  });
});

//mój test dla http method post
describe("httpbin tests4", () => {
  const request = {
    method: "POST",
    url: "https://httpbin.org/post",
    qs: {
      username: "abc",
    },
    failOnStatusCode: false,
  };
  it("response code should be 200", () => {
    cy.request(request).then((response) => {
      const status = response.status;
      assert.equal(200, status);
      assert.equal("abc", response.body.args.username);
    });
  });
});

//mój test dla POST
describe("httpbin tests5", () => {
  const request = {
    method: "POST",
    url: "https://httpbin.org/post",
    failOnStatusCode: false,
  };
  it("response code should be 200", () => {
    cy.request(request).then((response) => {
      const status = response.status;
      assert.equal(200, status);
    });
  });
});

// mój test PUT /delay/{delay}
describe("httpbin tests6", () => {
  const request = {
    method: "POST",
    url: "https://httpbin.org/delay/5",
    qs: {
      delay: 5,
    },
    failOnStatusCode: false,
  };
  it("response code should be 200", () => {
    cy.request(request).then((response) => {
      const status = response.status;
      assert.equal(200, status);
      assert.equal(5, response.body.args.delay);
    });
  });
});

//mój test dla http method post
describe("httpbin tests7", () => {
  const bodyData = {
    bodyKey: "bodyValue",
  };
  const request = {
    method: "POST",
    url: "https://httpbin.org/post",
    qs: {
      username: "abc",
    },
    body: bodyData,
    failOnStatusCode: false,
  };
  it("response code should be 200", () => {
    cy.request(request).then((response) => {
      const status = response.status;
      assert.equal(200, status);
      assert.equal("abc", response.body.args.username);
      assert.notStrictEqual(bodyData, response.body.data);
    });
  });
});

//mój test dla http method get
describe("httpbin tests8", () => {
  const request = {
    method: "GET",
    url: "https://httpbin.org/response-headers",
    headers: {
      customHeader: "customValue",
    },
    failOnStatusCode: false,
  };
  it("response code should be 200", () => {
    cy.request(request).then((response) => {
      const status = response.status;
      assert.equal(200, response.status);
      assert.equal("customValue", response.requestHeaders.customHeader);
    });
  });
});

//mój test dla http method get
describe("httpbin tests9", () => {
  const request = {
    method: "GET",
    url: "https://httpbin.org/cookies",
    headers: {
      Cookie: "cookieName=cookieValue",
    },
    failOnStatusCode: false,
  };
  it("response code should be 200", () => {
    cy.request(request).then((response) => {
      assert.equal(200, response.status);
      assert.equal("cookieName=cookieValue", response.requestHeaders["Cookie"]);
    });
  });
});

//mój test dla http method get
describe("httpbin tests10", () => {
  const request = {
    method: "GET",
    url: "https://httpbin.org/user-agent",
    headers: {
      "User-Agent": "my test user-agent",
    },
    failOnStatusCode: false,
  };
  it("response code should be 200", () => {
    cy.request(request).then((response) => {
      assert.equal(200, response.status);
      assert.equal("my test user-agent", response.requestHeaders["User-Agent"]);
    });
  });
});

//mój test dla http method get
describe("httpbin tests11", () => {
  it("response code should be 200", () => {
    const request = {
      method: "GET",
      url: "https://httpbin.org/ip",
    };

    cy.request(request).then((resp) => {
      cy.log(resp.body.origin);
      assert.equal("79.191.153.231", resp.body.origin);
    });
  });
});

//mój test dla http method get
describe("httpbin tests12", () => {
  it("response code should be 200", () => {
    const request = {
      method: "GET",
      url: "https://httpbin.org/ip",
    };

    cy.request(request).then((resp) => {
      assert.equal("79.191.153.231", resp.body.origin);
      assert.isTrue(resp.duration < 2000);
    });
  });
});

//mój test dla http method get
describe("httpbin tests13", () => {
  it("response code should be 200", () => {
    for (let i = 0; i < 10; i++) {
      const randomID = getRandomInt(1000);

      const request = {
        method: "GET",
        url: "https://httpbin.org/ip",
        id: randomID,
      };

      cy.request(request).then((resp) => {
        cy.log(randomID);
        assert.isTrue(resp.status == 200);
        assert.isTrue(resp.duration < 1000);
      });
    }
  });
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
