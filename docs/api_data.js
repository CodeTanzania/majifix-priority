define({ "api": [
  {
    "type": "delete",
    "url": "/priorities/:id",
    "title": "Delete Priority",
    "group": "Priority",
    "name": "DeletePriority",
    "version": "1.0.0",
    "description": "<p>Delete existing priority</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-priority.herokuapp.com/v1/priorities/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique priority identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which priority belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name.en",
            "description": "<p>Unique Human readable name of the priority e.g High, Low, Medium.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>Weight of the priority to help in ordering service request(issue) based on priority.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>A color code used to differentiate a service request priority visually.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when priority was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when priority was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"_id\": \"592029e5e8dd8e00048c1816\",\n    jurisdiction: {\n      _id: \"5af36f7cdfbcfc17b0614933\",\n      code: \"43138529\",\n      name: \"Myanmar\",\n      color: \"#837AD6\"\n    },\n    \"name\": \"Low\",\n    \"weight\": 0,\n    \"color\": \"#1B5E21\",\n    \"createdAt\": \"2017-05-20T11:35:01.059Z\",\n    \"updatedAt\": \"2017-05-20T11:35:01.059Z\",\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/jurisdictions/:jurisdiction/priorities",
    "title": "List Jurisdiction Priorities",
    "version": "1.0.0",
    "name": "GetJurisdictionPriorities",
    "group": "Priority",
    "description": "<p>Returns a list of priorities of specified jurisdiction</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-priority.herokuapp.com/v1/jurisdictions/:jurisdiction/priorities"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of priorities</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>Unique priority identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which priority belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name.en",
            "description": "<p>Unique Human readable name of the priority e.g High, Low, Medium.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.weight",
            "description": "<p>Weight of the priority to help in ordering service request(issue) based on priority.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.color",
            "description": "<p>A color code used to differentiate a service request priority visually.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.createdAt",
            "description": "<p>Date when priority was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.updatedAt",
            "description": "<p>Date when priority was last updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>Total number of priority</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Number of priority returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Query limit used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Query skip/offset used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page number</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>Total number of pages</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastModified",
            "description": "<p>Date and time at which latest priority was last modified</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"data\": [\n          {\n            \"_id\": \"592029e5e8dd8e00048c1816\",\n            jurisdiction: {\n              _id: \"5af36f7cdfbcfc17b0614933\",\n              code: \"43138529\",\n              name: \"Myanmar\",\n              color: \"#837AD6\"\n            },\n            \"name\": \"Low\",\n            \"weight\": 0,\n            \"color\": \"#1B5E20\",\n            \"createdAt\": \"2017-05-20T11:35:01.586Z\",\n            \"updatedAt\": \"2017-05-20T11:35:01.586Z\",\n        }\n     ],\n     \"total\": 5,\n     \"size\": 1,\n     \"limit\": 1,\n     \"skip\": 0,\n     \"page\": 1,\n     \"pages\": 5,\n     \"lastModified\": \"Mon, 30 Apr 2018 12:33:58 GMT\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/priorities",
    "title": "List Priorities",
    "group": "Priority",
    "name": "GetPriorities",
    "version": "1.0.0",
    "description": "<p>Returns a list of priorities</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-priority.herokuapp.com/v1/priorities"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of priorities</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>Unique priority identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which priority belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name.en",
            "description": "<p>Unique Human readable name of the priority e.g High, Low, Medium.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.weight",
            "description": "<p>Weight of the priority to help in ordering service request(issue) based on priority.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.color",
            "description": "<p>A color code used to differentiate a service request priority visually.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.createdAt",
            "description": "<p>Date when priority was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.updatedAt",
            "description": "<p>Date when priority was last updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>Total number of priority</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Number of priority returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Query limit used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Query skip/offset used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page number</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>Total number of pages</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastModified",
            "description": "<p>Date and time at which latest priority was last modified</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"data\": [\n          {\n            \"_id\": \"592029e5e8dd8e00048c1816\",\n            jurisdiction: {\n              _id: \"5af36f7cdfbcfc17b0614933\",\n              code: \"43138529\",\n              name: \"Myanmar\",\n              color: \"#837AD6\"\n            },\n            \"name\": \"Low\",\n            \"weight\": 0,\n            \"color\": \"#1B5E20\",\n            \"createdAt\": \"2017-05-20T11:35:01.586Z\",\n            \"updatedAt\": \"2017-05-20T11:35:01.586Z\",\n        }\n     ],\n     \"total\": 5,\n     \"size\": 1,\n     \"limit\": 1,\n     \"skip\": 0,\n     \"page\": 1,\n     \"pages\": 5,\n     \"lastModified\": \"Mon, 30 Apr 2018 12:33:58 GMT\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/priorities/:id",
    "title": "Get Existing Priority",
    "group": "Priority",
    "name": "GetPriority",
    "version": "1.0.0",
    "description": "<p>Get existing priority</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-priority.herokuapp.com/v1/priorities/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique priority identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which priority belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name.en",
            "description": "<p>Unique Human readable name of the priority e.g High, Low, Medium.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>Weight of the priority to help in ordering service request(issue) based on priority.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>A color code used to differentiate a service request priority visually.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when priority was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when priority was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"_id\": \"592029e5e8dd8e00048c1816\",\n    jurisdiction: {\n      _id: \"5af36f7cdfbcfc17b0614933\",\n      code: \"43138529\",\n      name: \"Myanmar\",\n      color: \"#837AD6\"\n    },\n    \"name\": \"Low\",\n    \"weight\": 0,\n    \"color\": \"#1B5E21\",\n    \"createdAt\": \"2017-05-20T11:35:01.059Z\",\n    \"updatedAt\": \"2017-05-20T11:35:01.059Z\",\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      }
    }
  },
  {
    "type": "patch",
    "url": "/priorities/:id",
    "title": "Patch Existing Priority",
    "group": "Priority",
    "name": "PatchPriority",
    "version": "1.0.0",
    "description": "<p>Patch existing priority</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-priority.herokuapp.com/v1/priorities/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique priority identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which priority belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name.en",
            "description": "<p>Unique Human readable name of the priority e.g High, Low, Medium.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>Weight of the priority to help in ordering service request(issue) based on priority.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>A color code used to differentiate a service request priority visually.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when priority was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when priority was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"_id\": \"592029e5e8dd8e00048c1816\",\n    jurisdiction: {\n      _id: \"5af36f7cdfbcfc17b0614933\",\n      code: \"43138529\",\n      name: \"Myanmar\",\n      color: \"#837AD6\"\n    },\n    \"name\": \"Low\",\n    \"weight\": 0,\n    \"color\": \"#1B5E21\",\n    \"createdAt\": \"2017-05-20T11:35:01.059Z\",\n    \"updatedAt\": \"2017-05-20T11:35:01.059Z\",\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/priorities",
    "title": "Create New Priority",
    "group": "Priority",
    "name": "PostPriority",
    "version": "1.0.0",
    "description": "<p>Create new Priority</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-priority.herokuapp.com/v1/priorities"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique priority identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which priority belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name.en",
            "description": "<p>Unique Human readable name of the priority e.g High, Low, Medium.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>Weight of the priority to help in ordering service request(issue) based on priority.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>A color code used to differentiate a service request priority visually.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when priority was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when priority was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"_id\": \"592029e5e8dd8e00048c1816\",\n    jurisdiction: {\n      _id: \"5af36f7cdfbcfc17b0614933\",\n      code: \"43138529\",\n      name: \"Myanmar\",\n      color: \"#837AD6\"\n    },\n    \"name\": \"Low\",\n    \"weight\": 0,\n    \"color\": \"#1B5E21\",\n    \"createdAt\": \"2017-05-20T11:35:01.059Z\",\n    \"updatedAt\": \"2017-05-20T11:35:01.059Z\",\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/priorities/:id",
    "title": "Put Existing Priority",
    "group": "Priority",
    "name": "PutPriority",
    "version": "1.0.0",
    "description": "<p>Put existing priority</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-priority.herokuapp.com/v1/priorities/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique priority identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which priority belongs to</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name.en",
            "description": "<p>Unique Human readable name of the priority e.g High, Low, Medium.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>Weight of the priority to help in ordering service request(issue) based on priority.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>A color code used to differentiate a service request priority visually.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when priority was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when priority was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"_id\": \"592029e5e8dd8e00048c1816\",\n    jurisdiction: {\n      _id: \"5af36f7cdfbcfc17b0614933\",\n      code: \"43138529\",\n      name: \"Myanmar\",\n      color: \"#837AD6\"\n    },\n    \"name\": \"Low\",\n    \"weight\": 0,\n    \"color\": \"#1B5E21\",\n    \"createdAt\": \"2017-05-20T11:35:01.059Z\",\n    \"updatedAt\": \"2017-05-20T11:35:01.059Z\",\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  }
] });