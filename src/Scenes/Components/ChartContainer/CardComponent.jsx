import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import GraphComponent from './ChartComponent';
import axios from 'axios';
import { connect } from 'react-redux';
import {updateChartData} from '../../../Redux/action';
 
class CardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      loading: false,
      cardList: [] 
    }
  }

  interval = setInterval(() => {
    this.requestChartData();
  }, 1000);

  requestChartData() {
    axios.get('http://localhost/TVS/graph.php').then(res => {     
      let chartdata = res.data;
      this.props.updateChartData(chartdata);
      console.log(chartdata)
    }).catch(err => {
        console.log(err);
      })
  }

  toggleBorder = () => {
    this.setState({ loading: !this.state.loading })
  }
  prepareChartParams  = (chartdata) => {
    let t1 = [];
    let t2 = [];
    let t9 = [];
    let rpm = [];
    let p2 = [];
    let date_Time = [];
    for (let i = 0; i < chartdata.length; i++) {
      t1.push(chartdata[i].T1);
      t2.push(chartdata[i].T2);
      t9.push(chartdata[i].T9);
      rpm.push(chartdata[i].RPM);
      p2.push(chartdata[i].P2);
      date_Time.push(new Date(chartdata[i].date_Time).toLocaleTimeString([], { hour12: false }));
    }
    let chartLabel = ["Temp1", "Temp2", "Temp9", "RPM", "Pressure"];
    for (let i = 0; i < chartdata.chartLabel; i++) {
      chartLabel = chartLabel[i];
    }
    let chartArray = [];
    chartArray.push(t1);
    chartArray.push(t2);
    chartArray.push(t9);
    chartArray.push(rpm);
    chartArray.push(p2);
    console.log(chartArray)
    const  chartValue= []
    for (let i = 0; i < chartArray.length; i++) {
      let chart =
      {
        // title: "chart-"+(i+1),
        size: 8,
        labels: date_Time,
        dataSet: {
          chartData: chartArray[i],
          chartLabel: chartLabel[i],
          chartBackgroundColor: [
            'rgba(24,144,255,0.2)'
           
          ],
          chartBorderColor: [
            'rgba(24, 144, 255, 0.5)',
            'rgba(24, 144, 255, 0.5)',
            'rgba(24, 144, 255, 0.5)',
            'rgba(24, 144, 255, 0.5)',
            'rgba(24, 144, 255, 0.5)',
            'rgba(24, 144, 255, 0.5)'
          ]          
        }          
      }    
      chartValue.push(chart  )
    }
    return chartValue
  }

  render() {
    const { loading } = this.state;
    const chartData = this.props.app.chartData ? this.props.app.chartData : null; 
    const chart = this.prepareChartParams(chartData)
     console.log(chart)
    if (chart !== undefined && chart.length >= 5) {
      return (
        <div style={{ backgroundColor: '#212840' }}>
          <div className="site-card-wrapper">
            <Row gutter={16}>              
                {chart ?
                  chart.map(it => {
                    return (
                      <Col span={6}>
                        <Card style={{ backgroundColor: '#131633', height: '200px', border: 'none', borderRadius: '0px' }}>{it.title}
                          <GraphComponent
                            data={it.dataSet.chartData ? it.dataSet.chartData : []}
                            labels={it.dataSet.chartLabel ? it.dataSet.chartLabel : []}
                            label={it.dataSet.chartLabel ? it.dataSet.chartLabel : "No Lebel"}
                            backgroundColor={it.dataSet.chartBackgroundColor ? it.dataSet.chartBackgroundColor : []}
                            borderColor={it.dataSet.chartBorderColor ? it.dataSet.chartBorderColor : []}
                          />
                        </Card>
                      </Col>
                    )
                  }) : []
                }
            </Row>
          </div>
        </div>
      );
    }
    else {
      return (<div className="site-card-wrapper"></div>);
    }
  }
}

const mapStateToProps = state => ({
  app: state.app
})

const mapDispatchToProps = {
  updateChartData
}

const card = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardComponent)

export default card;