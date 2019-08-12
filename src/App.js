import React, { useState, useEffect } from 'react';
import { DatePicker, InputNumber, Select, Row, Col, Button } from 'antd';
import { MDBDataTable } from 'mdbreact';
import calculateInterests from './calculations/interestCalculations';
import CalculateZakah from './calculations/zakahCalculations';
import data from './constants/data';
import axios from 'axios';

import './App.css';

const App = () => {
  const dateFormat = 'DD/MM/YYYY';
  const { Option } = Select;
  const [date, setDate] = useState(0);
  const [amount, setAmount] = useState(0);
  const [bankName, setBankName] = useState(0);
  const [duration, setDuration] = useState(0);
  const [interestDuration, setInterestDuration] = useState(0);
  const [interestAmount, setInterestAmount] = useState(0);
  const [certificatesData, setCertificatesData] = useState([]);
  const [appearSuccessfulSubmission, setAppearSuccessful] = useState(false);
  const [interestsDataTable, SetInterestDataTable] = useState([]);
  const [zakahDataTable, setZakahDataTable] = useState([]);
  const [toggle,setToggle]=useState(false);

  let interestData;
  let zakahData;

  useEffect(() => {
    // Update the document title using the browser API
    axios.get('http://localhost:3001/certificates').then((res) => {
      data.certificatesTableData.rows=[];
      res.data.forEach((dataEntry) => {
        const { id, ...rest } = dataEntry;
        data.certificatesTableData.rows.unshift(rest);
        interestData = calculateInterests(rest);
        zakahData = CalculateZakah(rest);
      });
      //to get rid of react hooks bailing out when comparing state with isObject
      setCertificatesData({...data.certificatesTableData});
      if (data.certificatesTableData.rows.length !== 0) {
        loadInterestsDate();
        loadZakahTable();
      }
    });
  }, [toggle]);

  const addNewCertificate = () => {
    axios
      .post('http://localhost:3001/certificates', {
        bankName,
        interestDuration,
        duration,
        interestAmount,
        amount,
        date,
      })
      .then(() => {
        setAppearSuccessful(true);
        setToggle(!toggle);
      });
  };

  const loadInterestsDate = () => {
    let { sortedDateArray, interestDictionary } = interestData;

    for (let element of sortedDateArray) {
      data.interestTableData.rows.push({
        interest: interestDictionary[element],
        date: element,
      });
    }

    SetInterestDataTable({ ...data.interestTableData });
  };

  const loadZakahTable = () => {
    let { sortedDateArray, zakahDictionary } = zakahData;

    console.log(sortedDateArray);
    console.log(zakahDictionary);

    for (let element of sortedDateArray) {
      data.zakahTableData.rows.push({
        zakah: zakahDictionary[element],
        date: element,
      });
    }

    setZakahDataTable({ ...data.zakahTableData });
  };

  const onChangeInterestRate = (value) => {
    setInterestAmount(value);
  };
  const onChangeAmount = (value) => {
    setAmount(value);
  };

  const onChangeDate = (value) => {
    setDate(value);
  };

  const onChangeDuration = (value) => {
    setDuration(value);
  };
  const onChangeinterestDuration = (value) => {
    setInterestDuration(value);
  };
  const onChangebankName = (value) => {
    setBankName(value);
  };

  return (
    <div className="App">
      <div style={{ border: 'solid 5px', paddingBottom: 40, margin: 60 }}>
        <h1 style={{ marginBottom: 40, marginTop: 30 }}>إضافة شهادة استثمار</h1>
        <Row gutter={15} type="flex" justify="center">
          <Col>
            <Button onClick={addNewCertificate} type="primary">
              إضافة
            </Button>
          </Col>

          <Col>
            <InputNumber
              onChange={onChangeInterestRate}
              placeholder="نسبة الفائدة"
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace('%', '')}
            />
          </Col>

          <Col>
            <Select
              style={{ width: 150 }}
              onChange={onChangeinterestDuration}
              showSearch
              placeholder="الفائدة تخرج كل"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="شهرى"> شهرى</Option>
              <Option value="ربع سنوى">ربع سنوى</Option>
              <Option value="نصف سنوى">نصف سنوى </Option>
              <Option value="سنوى">سنوى</Option>
            </Select>
          </Col>

          <Col>
            <Select
              onChange={onChangeDuration}
              style={{ width: 150 }}
              showSearch
              placeholder="المدة"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="سنة"> سنة</Option>
              <Option value="سنة ونصف">سنة ونصف</Option>
              <Option value="ثلاث سنوات">ثلاث سنوات</Option>
              <Option value="خمس سنوات">خمس سنوات</Option>
            </Select>
          </Col>

          <Col>
            {' '}
            <Select
              onChange={onChangebankName}
              style={{ width: 200 }}
              showSearch
              placeholder="اسم البنك"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="بنك مصر">بنك مصر</Option>
              <Option value="البنك الاهلى">البنك الاهلى</Option>
              <Option value="بنك القاهرة">بنك القاهرة</Option>
            </Select>
          </Col>

          <Col>
            <InputNumber
              onChange={onChangeAmount}
              placeholder="المقدار"
              style={{ width: 200 }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value.replace(/\E\G\P\s?|(,*)/g, '')}
            />
          </Col>

          <Col>
            <DatePicker
              onChange={onChangeDate}
              format={dateFormat}
              placeholder="اختر تاريخ"
            />
          </Col>
        </Row>
        <Row>
          {appearSuccessfulSubmission ? (
            <h2 style={{ marginTop: 30, fontSize: 25, color: 'green' }}>
              تمت إضافة البيانات بنجاح
            </h2>
          ) : null}
        </Row>
      </div>
      <Button>إظهار كل الزكاة</Button>
      <Button>إظهار كل الفوائد</Button>
      <Button>إظهار كل الشهادات</Button>

      <div style={{ marginLeft: 120, marginRight: 120 }}>
        <MDBDataTable
          btn
          className="text-center"
          theadColor="text-muted"
          hover
          small
          searchLabel=""
          data={certificatesData}
          searching={true}
          entriesLabel=""
          responsive
        />
      </div>

      <div style={{ marginLeft: 120, marginRight: 120 }}>
        <MDBDataTable
          btn
          className="text-center"
          theadColor="text-muted"
          hover
          small
          searchLabel=""
          data={interestsDataTable}
          searching={true}
          entriesLabel=""
          responsive
        />
      </div>

      <div style={{ marginLeft: 120, marginRight: 120 }}>
        <MDBDataTable
          btn
          className="text-center"
          theadColor="text-muted"
          hover
          small
          searchLabel=""
          data={zakahDataTable}
          searching={true}
          entriesLabel=""
          responsive
        />
      </div>
    </div>
  );
};

export default App;
