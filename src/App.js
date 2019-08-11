import React, { useState } from 'react';
import { DatePicker, InputNumber, Select, Row, Col, Button } from 'antd';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';

import './App.css';



const data = {
  columns: [
    {
      label: 'البنك',
      field: 'name',
      sort: 'asc',
      width: 150,
    },
    {
      label: 'خروج الفائدة كل',
      field: 'position',
      sort: 'asc',
      width: 270,
    },
    {
      label: 'عمر الشهادة',
      field: 'office',
      sort: 'asc',
      width: 200,
    },
    {
      label: 'قيمة الفائدة',
      field: 'age',
      sort: 'asc',
      width: 100,
    },
    {
      label: 'قيمتها',
      field: 'date',
      sort: 'asc',
      width: 150,
    },
    {
      label: 'تاريخ الشهادة',
      field: 'salary',
      sort: 'asc',
      width: 100,
    },
  ],
  rows: [
    {
      name: 'Tiger Nixon',
      position: 'System Architect',
      office: 'Edinburgh',
      age: '61',
      date: '2011/04/25',
      salary: '$320',
    },
  ],
};
const App = () => {
  const dateFormat = 'DD/MM/YYYY';
  const { Option } = Select;
  const [date, setDate] = useState(0);
  const [amount, setAmount] = useState(0);
  const [bankName, setBankName] = useState(0);
  const [duration, setDuration] = useState(0);
  const [interestDuration, setInterestDuration] = useState(0);
  const [interestAmount, setInterestAmount] = useState(0);

  const addNewCertificate = () => {
    console.log(' A certificate has been added ');
  };

  const onChangeInterestRate = (value) => {
    console.log(value);
    setInterestAmount(value);
  };
  const onChangeAmount = (value) => {
    console.log(value);
    setAmount(value);
  };

  const onChangeDate = (value) => {
    console.log(value);
    setDate(value);
  };

  const onChangeDuration = (value) => {
    console.log(value);
    setDuration(value);
  };
  const onChangeinterestDuration = (value) => {
    console.log(value);
    setInterestDuration(value);
  };
  const onChangebankName = (value) => {
    console.log(value);
    setBankName(value);
  };

  return (
    <div className="App">
      <div style={{ border: 'solid 5px', paddingBottom: 50, margin: 60 }}>
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
              <Option value="month"> شهرى</Option>
              <Option value="quarter">ربع سنوى</Option>
              <Option value="half">نصف سنوى </Option>
              <Option value="annualy">سنوى</Option>
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
              <Option value="one"> سنة</Option>
              <Option value="oneHalf">سنة ونصف</Option>
              <Option value="three">ثلاث سنوات</Option>
              <Option value="five">خمس سنوات</Option>
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
              <Option value="Misr">بنك مصر</Option>
              <Option value="Ahly">البنك الاهلى</Option>
              <Option value="Kahera">بنك القاهرة</Option>
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
      </div>
      <div>
        <MDBDataTable
          btn
          className="text-center"
          theadColor="text-muted"
          hover
          small
          searchLabel=""
          data={data}
          searching={true}
          entriesLabel=""
          responsive
        />
      </div>
    </div>
  );
};

export default App;
