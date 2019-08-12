let data = {
  certificatesTableData: {
    columns: [
      {
        label: 'البنك',
        field: 'bankName',
        sort: 'asc',
      },
      {
        label: 'خروج الفائدة كل',
        field: 'interestDuration',
        sort: 'asc',
      },
      {
        label: 'عمر الشهادة',
        field: 'duration',
        sort: 'asc',
      },
      {
        label: 'قيمة الفائدة',
        field: 'interestAmount',
        sort: 'asc',
      },
      {
        label: 'قيمتها',
        field: 'amount',
        sort: 'asc',
      },
      {
        label: 'تاريخ الشهادة',
        field: 'date',
        sort: 'asc',
      },
    ],
    rows: [],
  },
  interestTableData: {
    columns: [
      {
        label: 'قيمة الفائدة',
        field: 'interest',
        sort: 'asc',
      },
      {
        label: 'تاريخ الفائدة',
        field: 'date',
        sort: 'asc',
      },
    ],
    rows: [],
  },
  zakahTableData:{
    columns: [
        {
          label: 'قيمة الزكاة',
          field: 'zakah',
          sort: 'asc',
        },
        {
          label: 'تاريخ الزكاة',
          field: 'date',
          sort: 'asc',
        },
      ],
      rows:[]
  }
};

export default data;
