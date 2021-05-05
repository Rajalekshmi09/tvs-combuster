import axios from 'axios';
import { url } from './constants'

const URL = url
const BASE_URL = URL.BASE_URL
const turboConfigUrl = `${BASE_URL}${URL.TURBO_CONFIG}`
const turboConfigSubmitUrl = `${BASE_URL}${URL.TURBO_CONFIG_SUBMIT}`
const testConfigUrl = `${BASE_URL}${URL.TEST_CONFIG}`
const paramConfigUrl = `${BASE_URL}${URL.PARAM_CONFIG}`
const shutdownClickEventUrl = `${BASE_URL}${URL.SHUTDOWN_CLICK}`
const resetClickEventUrl = `${BASE_URL}${URL.RESET_CLICK}`
const updateConfigDataUrl = `${BASE_URL}${URL.UPDATE_CONFIG_DATA}`
const loginValidationUrl = `${BASE_URL}${URL.LOGIN_VALIDATION}`
const forgotValidationUrl = `${BASE_URL}${URL.FORGOT_VALIDATION}`
const registerPageValidationUrl = `${BASE_URL}${URL.REGISTERPAGE_VALIDATION}`
const tableViewUrl = `${BASE_URL}${URL.TABLE_VIEW}`
const chartDataUrl = `${BASE_URL}${URL.GRAPH_CHART_DATA}`
const sensorDataUrl = `${BASE_URL}${URL.SENSOR_DATA}`

let that = this;

const getTurboConfigData = (callBack) => {
  axios.get(turboConfigUrl).then(res => {
    let turboData = res.data
    callBack(turboData)
  }).catch((err) => {
    console.log(err);
  })
}
const turbineConfigSubmit = (body, callBack) => {
  axios.post(turboConfigSubmitUrl, body)
    .then(res => {
      if (res.data) {
        console.log(res.data)
        callBack(res.data)
      }
    }).catch(err => {
      console.log(err.res)
    })
}
const getTestConfigData = (callBack) => {
  axios.get(testConfigUrl)
    .then(res => {
      let testData = res.data;
      callBack(testData)
    }).catch((err) => {
      console.log(err);
    })
}
const getParamConfigData = (callBack) => {
  axios.get(paramConfigUrl)
    .then(res => {
      let paramData = res.data
      callBack(paramData)
    }).catch((err) => {
      console.log(err);
    })
}

const shutdownClickEvent = (callBack) => {
  axios.post(shutdownClickEventUrl)
    .then(function (response) {
      let shutdownValue = response
      callBack(shutdownValue)
    }).catch((err) => {
      console.log(err);
    })
}

const resetClickEvent = (callBack) => {
  axios.post(resetClickEventUrl, { ResetRPM: this.state.ResetRPM, ResetTemp: this.state.ResetTemp })
    .then(function (response) {
      let resetValue = response
      callBack(resetValue)
    })
}

const updateConfigData = (data, callBack) => {
  axios.post(updateConfigDataUrl, data)
    .then(res => {
      let configData = res.data
      callBack(configData)
      console.log(configData)
    }).catch(err => {
      console.log(err.res)
    })
}

const loginValidation = (values, callBack) => {
  axios.post(loginValidationUrl, values)
    .then(res => {
      console.log(res.data)
      callBack(res.data)
    })
    .catch(err => {
      console.log(err.res)
    })
}

const forgotValidation = (values, callBack) => {
  axios.post(forgotValidationUrl, values)
    .then(res => {
      console.log(res.data)
      callBack(res.data)
    })
    .catch(err => {
      console.log(err.res)
    })
};

const registerPageValidation = (values, callBack) => {
  axios.post(registerPageValidationUrl, values)
    .then(res => {
      console.log(res.data)
      callBack(res.data)
    })
    .catch(err => {
      console.log(err.res)
    })
};
const getTableView = (callBack) => {
  axios.post(tableViewUrl)
    .then(res => {
      console.log(res.data)
      callBack(res.data)
    })
    .catch(err => {
      console.log(err.res)
    })
};

const getChartData = (callBack) => {
  axios.post(chartDataUrl)
    .then(res => {
      console.log(res.data)
      callBack(res.data)
    })
    .catch(err => {
      console.log(err.res)
    })
};

const getSensorData = (callBack) => {
  axios.post(sensorDataUrl)
    .then(res => {
      console.log(res.data)
      callBack(res.data)
    })
    .catch(err => {
      console.log(err.res)
    })
};

export {
  getTurboConfigData,
  turbineConfigSubmit,
  getTestConfigData,
  getParamConfigData,
  shutdownClickEvent,
  resetClickEvent,
  updateConfigData,
  loginValidation,
  forgotValidation,
  registerPageValidation,
  getTableView,
  getChartData,
  getSensorData



}