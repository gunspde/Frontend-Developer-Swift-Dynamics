import React, { useEffect, useState } from "react";
import { Button, Col, Flex, Row, Spin, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { Content } from "antd/es/layout/layout";
import ModalForm from "./modalForm";
import { useTranslation } from "react-i18next";
import { deleteAllUser, deleteUser, getUser, getUserById } from "../../store/userReducer";
import { useDispatch, useSelector } from "react-redux";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

export interface DataType {
  key?: React.Key;
  name?: any;
  nationality?: string;
  id?: number;
  firstName?: string;
  lastName?: string;
  gender?: string;
  mobilePhone?: string;
  prefix?: string;
  phone?: string;
  national?: string;
}

const TableListScreen: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userList = useSelector((state: any) => state?.userList?.userList);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataSourceItem, setDataSourceItem] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIdUser, setSelectedIdUser] = useState(0);
  const [formData, setFormData] = useState<any>();
  const [isLoadingForm, setIsLoadingForm] = useState<boolean>(true);

  useEffect(() => {
    setDataSourceItem(userList);
    setLoading(false);
    setIsLoadingForm(true)
    handlerFormValue()
  }, [loading, isLoadingForm, selectedIdUser]);

  const [modeSentToForm, setModeSentToForm] = useState(
    "MODE_CREATE_FORM_TITLE"
  );
  const handlerFormValue = () => {
    
    if(selectedIdUser === 0) {
      setFormData({
        title: "",
        firstName: "",
        lastName: "",
        birthday: new Date,
        national: "",
        gender: "",
        cityzenId: "",
        prefix: "",
        phone: "",
        passportNo: "",
        expectedSalary: ""
      })
      setIsLoadingForm(false)
    } else {
      const filterUserWithId = userList.filter((item: DataType) => item.id === selectedIdUser)
        setFormData({
          title: filterUserWithId[0]?.title,
          firstName: filterUserWithId[0]?.firstName,
          lastName: filterUserWithId[0]?.lastName,
          birthday: filterUserWithId[0]?.birthday,
          national: filterUserWithId[0]?.national,
          gender: filterUserWithId[0]?.gender,
          cityzenId: filterUserWithId[0]?.cityzenId,
          prefix: filterUserWithId[0]?.prefix,
          phone: filterUserWithId[0]?.phone,
          passportNo: filterUserWithId[0]?.passportNo,
          expectedSalary: filterUserWithId[0]?.expectedSalary,
        })
        setIsLoadingForm(false)
    }
  }
  const dataSource = dataSourceItem?.map<DataType>((item, i) => ({
    key: item.id,
    name: `${item.firstName} ${item.lastName}`,
    gender: `${item.gender}`,
    mobilePhone: `+${item.prefix}${item.phone}`,
    nationality: item.national,
  }));

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onClickDeleteAllUser = () => {
    setLoading(true);
    dispatch(deleteAllUser(selectedRowKeys));
    setSelectedRowKeys([])
  }

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const contentStyle: React.CSSProperties = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  };

  const content = <div style={contentStyle} />;

  const hasSelected = selectedRowKeys.length > 0;
  const onClickCreateUser = () => {
    setIsLoadingForm(true)
    const defaultValueForm = {
      title: "",
      firstName: "",
      lastName: "",
      birthday: new Date(),
      national: "",
      gender: "",
      cityzenId: "",
      prefix: "",
      phone: "",
      passportNo: "",
      expectedSalary: ""
    }
    dispatch(getUserById(defaultValueForm))
    showModal();
    setModeSentToForm("MODE_CREATE_FORM_TITLE");
  };

  const onClickUpdateUser = (id: number) => {
    setIsLoadingForm(true)
    const filterUserById = userList.filter((item: DataType) => item?.id === id)
    dispatch(getUserById(filterUserById[0]))
    setSelectedIdUser(id);
    showModal();
    setModeSentToForm("MODE_UPDATE_FORM_TITLE");
  };

  const onClickDeleteUser = (id: number) => {
    setLoading(true);
    dispatch(deleteUser({ id: id }));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title:  t(`TABLE_TH_NAME`),
      dataIndex: "name",
      sorter: (a, b) => a.name?.length - b.name?.length,
    },
    {
      title:  t(`TABLE_TH_Gender`),
      dataIndex: "gender",
      sorter: (a, b) => a.name?.length - b.name?.length,
    },
    {
      title:t(`TABLE_TH_MOBILEPHONE`),
      dataIndex: "mobilePhone",
      sorter: (a, b) => a.name?.length - b.name?.length,
    },
    {
      title: t(`TABLE_TH_NATIONALITY`),
      dataIndex: "nationality",
      sorter: (a, b) => a.name?.length - b.name?.length,
    },
    {
      title: t(`TABLE_TH_MANAGE`),
      key: "key",
      dataIndex: "key",
      render: (text, record) => (
        <>
          <Row>
            <Col span={24}>
              <Content>
                <Flex gap="middle" vertical>
                  <Flex align="start" gap="middle">
                    <Button
                      type="primary"
                      onClick={() => onClickUpdateUser(text)}
                      style={{ background: "#ffc107" }}
                    >
                      {t(`MODE_UPDATE_FORM_TITLE`)}
                    </Button>
                    <Button
                      type="primary"
                      danger
                      onClick={() => onClickDeleteUser(text)}
                    >
                      {t(`BUTTON_DELETE`)}
                    </Button>
                  </Flex>
                </Flex>
              </Content>
            </Col>
          </Row>
        </>
      ),
    },
  ];

  return (
    <>
    {
      isLoadingForm ? ( 
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      ) : (
        <Row>
        <ModalForm
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          mode={modeSentToForm}
          idUser={selectedIdUser}
          setLoading={setLoading}
          formData={formData}
        />
        <Col span={24}>
          <Content style={{ padding: "0 48px" }}>
            <Flex gap="middle" vertical>
              <Flex align="center" gap="middle">
                <Button type="primary" onClick={() => onClickCreateUser()}>
                  {t(`MODE_CREATE_FORM_TITLE`)}
                </Button>
                <Button
                  type="primary"
                  danger
                  disabled={!hasSelected}
                  loading={loading}
                  onClick={() => onClickDeleteAllUser()}
                >
                  {t(`BUTTON_DELETE`)}
                </Button>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
              </Flex>
              {loading ? (
                <Spin tip="Loading" size="large">
                  {content}
                </Spin>
              ) : (
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={dataSource}
                />
              )}
            </Flex>
          </Content>
        </Col>
      </Row>
      )
    }
    </>
  
  );
};

export default TableListScreen;
