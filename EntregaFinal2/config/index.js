import dotenv from 'dotenv'
dotenv.config()
const MONGO_DB = process.env.MONGO_DB_URI



export default {
  mongodb: {
    conexion: MONGO_DB
  },
  firebase :{
    type: "service_account",
    project_id: "basefirebase-39d14",
    private_key_id: "8f15d6f10388f29ea4c0fa89eccaab97d03c65b9",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCpzx8V5EOuzLP3\nlE6ZRFspnoPKbEHNH0gMQAEsT7DKHz8Q1FldimNyzHMFSpnpO7DRKaYQ+6gwvWKF\nlSiSV+7hTcKPOEYn9JTJD+HNttvQG/zO/2AH0GOvnsVnFLAUwOu100Bbp7KYWzLP\ngegVs6AatoPyEFS9bILdnT9RrnVsD+P80BHMozbZSZRgPvsyoyb6dVP49zV+Z+h1\n8usin+czrWZ/rbALq9rCGjkY8Ldqnw2RB+kSGvgddBufPMSe00RhJ1D/M2Z+Ao/d\nxO06knLjOnECXilO7lYn2GnUg7JOMN1zNcFldi8/vfdx/kxtxFyqbO/MeSPYJAJG\nBDJvTCV/AgMBAAECggEAKV+t00eqtgxqTQh1niJpk9prggaegbv9cf6mSoWgLZ8v\nXopeu8vcLzxhSgjDN3CzxELBk6G9eSKrvqB5Ii8KpRqtLPgpH9MX7WVRPy4uoKYx\nEr5mR4EeyMuGjXcc7/GRfNvb8nkJqtWNq8GbKq55dAjEXVZdT0oBGL4Xj29SbOGM\nJbV3cThJ69GFObd+4Y9/ptzQmKeLarcEyfJd7Hi0a7mKqWuwjMCnM9a/19Rw1Nrz\nHqLVxpmMTj4r5/PatxLMHpYr0vhK8dmP+w2Nkyy1LLpT5W44HGgMwAVsAIGednd8\nQZk+29gKO0Ag1PQbyI7jIhSTlP+ref6nQ4fxS2b/AQKBgQDnO33QuuB6og0jYHzI\nnmxkCiHxLNbIWDunJ0pZF+3IP05VNUBDfjIYSPkA7ikA4LNw1gqgQ2YBRY7jBV5C\nfD//sM7dSVHHQUG9R6yn0JVVdMO4lIvNOCj1gyX+Ums4XYaBcv3u2xwo42uY2gHO\nHdFBn+Hed4fG5jHr2gVUUlQFwwKBgQC7/18gIOY2QAfW6Tzt8d39ELP4xRH/EZzf\nTcYzJoyn3IxeMnhLU72sFaKzD0O5+xw4yw3jE7hAmBy4wmbuNVcxbZ2LKcJcYZ5r\npo0aTuPXw+P8Jv1+SpWE8FVelmX1tM11QABohNqybZk621654HOwD0sa7QC/CN6S\nigUz/cxZlQKBgQDZDkhBOlrj4uBwV+9qpwPaOIS6DrwjXmfItaId1c94TKysYYtM\nj9ZYY4+SJv3IfCUVA2cAH6ROB0xkoLJluJqe2wqkQGIKp6AdHH3fHXZAvJXI23AM\nGO6h4BU3EYjiZTCQrS/fGkDpxOlIl0Rghi7a6kks+oky1P0Bhyu/hnSm3wKBgQCb\nWa+10PnrooXX5ezfg5q5YHAYBmGUsW08afx6kERzAiFMRdB6Dr0R0t8bsGV67jKo\nC8Nx/f2oAwrY8mw0NAfVZItnUB64UEKlGoBHWSGWTt26pE2dauybai5hd07R95JA\nbZ7ov8Ao6cBRjq18VCnFNx4NJgQT2LRzy3H5QKT48QKBgHWVtLblDZmjpTb8Rkwk\nenzVLxNGrwhXEIqfbWzOiDhdv8OwXBtrkV7JkeKsMXyUFMrpIa33C8dEKTYjXzOh\nQgl24obs/su/NV4peKmCO2pkC8Q+j4PqBPTUH58WKxXDcBdA6jnhC6PTN/EMMVW3\n7EebIcjB6oclKBexa/XkC6bD\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-8uk4e@basefirebase-39d14.iam.gserviceaccount.com",
    client_id: "115076733237831993772",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8uk4e%40basefirebase-39d14.iam.gserviceaccount.com"
  }
}