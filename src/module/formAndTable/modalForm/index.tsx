import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
} from "antd";
import {
  genderData,
  nationNality,
  phoneNumberFormat,
  titleName,
} from "./utils";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../../../store/userReducer";

type Props = {
  isModalOpen: boolean;
  handleCancel: Function;
  mode: string;
  idUser: number;
  setLoading: Function;
  formData: any;
};
const { Option } = Select;

const config = {
  rules: [
    { type: "object" as const, required: true, message: "Please select time!" },
  ],
};

const ModalForm = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isModalOpen, handleCancel, mode, idUser, setLoading, formData } =
    props;
  const userList = useSelector((state: any) => state?.userList?.userList);
  const [form] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";
  const userById = useSelector((state: any) => state?.userList?.userById);
  const onFinish = async (values: any) => {
    if(mode === 'MODE_UPDATE_FORM_TITLE') {
     await dispatch(updateUser({id: userById?.id, ...values}))
  
      setLoading(true);
      handleCancel();
    } else {
      dispatch(
        addUser({
          id: userList?.length === 0 ? 1 : userList?.length + 1,
          ...values,
        })
      );
      setLoading(true);
      handleCancel();
    }
   
  };

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log('dateString', dateString);
  };

  const onReset = () => {
    form.resetFields();
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 90 }} defaultValue={userById?.prefix}>
        {phoneNumberFormat.map((item) => (
          <Option value={item.value} key={item.id}>
            {item.lable}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
  return (
    <>
      <Modal
        title={t(`${mode}`)}
        open={isModalOpen}
        onOk={() => handleCancel()}
        onCancel={() => handleCancel()}
        footer=""
        width={1000}
      >
        <Form
          name="complex-form"
          onFinish={onFinish}
          style={{ marginTop: "3rem" }}
          initialValues={{
            title: userById?.title,
            firstName: userById?.firstName,
            lastName: userById?.lastName,
            birthday: mode === 'MODE_UPDATE_FORM_TITLE' ? dayjs(userById?.birthday, dateFormat) : "",
            national: userById?.national,
            cityzenId: userById?.cityzenId,
            expectedSalary: userById?.expectedSalary,
            gender: userById?.gender,
            passportNo: userById?.passportNo,
            phone: userById?.phone,
            prefix: userById?.phone,
          }}
        >
          <Row gutter={[16, 16]}>
            <Col sm={4} xs={24} xl={4} lg={4}>
              <Form.Item label={t(`FORM_LABLE_TITLE`)}>
                <Form.Item
                  name="title"
                  noStyle
                  rules={[{ required:  userById?.title ? false : true, message: "Title is required" }]}
                >
                  <Select
                    placeholder="Select title"
                  >
                    {titleName.map((item) => (
                      <Option value={item.value} key={item.id}>
                        {item.lable}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form.Item>
            </Col>
            <Col sm={10} xs={24} xl={10} lg={10}>
              <Form.Item label={t(`FORM_LABLE_FIRSTNAME`)}>
                <Form.Item
                  name="firstName"
                  noStyle
                  rules={[{ required:  userById?.firstName ? false : true, message: "FirstName is required" }]}
                >
                  <Input
                    placeholder="Please input"
                  />
                </Form.Item>
              </Form.Item>
            </Col>
            <Col sm={10} xs={24} xl={10} lg={10}>
              <Form.Item label={t(`FORM_LABLE_LASTNAME`)}>
                <Form.Item
                  name="lastName"
                  noStyle
                  rules={[{ required:  userById?.lastName ? false : true, message: "LastName is required" }]}
                >
                  <Input
                    placeholder="Please input"
                  />
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 8]}>
            <Col sm={6} xs={26} xl={6} lg={6}>
              <Form.Item name="birthday" label={t(`FORM_LABLE_BIRTHDAY`)} {...config}
              rules={[{ required:  userById?.birthday ? false : true, message: "Birthday is required" }]}
              >
                {
                  mode !== 'MODE_UPDATE_FORM_TITLE' ? (
                    <DatePicker
                      onChange={onChangeDate}
                      format={dateFormat}
                    />
                  ) : (
                    <DatePicker
                    onChange={onChangeDate}
                    format={dateFormat}
                  />
                  )
                }
              </Form.Item>
            </Col>
            <Col sm={9} xs={24} xl={9} lg={9}>
              <Form.Item label={t(`FORM_LABLE_NATIONAL`)}>
                <Form.Item
                  name="national"
                  noStyle
                  rules={[{ required: userById?.birthday ? false : true, message: "National is required" }]}
                >
                  <Select
                    placeholder="Select National"
                  >
                    {nationNality.map((item) => (
                      <Option value={item.value} key={item.id}>
                        {item.lable}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form.Item>
            </Col>
            <Col sm={9} xs={24} xl={9} lg={9}>
              <Form.Item  label={t(`FORM_LABLE_GENDER`)}>
                <Form.Item
                  name="gender"
                  noStyle
                  rules={[{ required: userById?.gender ? false : true, message: "Gender is required" }]}
                >
                  <Radio.Group defaultValue={userById?.gender}>
                    {genderData.map((item) => (
                      <Radio value={item.value} key={item.id}>
                        {" "}
                        {item.lable}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col sm={12} xs={24} xl={12} lg={12}>
              <Form.Item label={t(`FORM_LABLE_CITIZENID`)}>
                <Form.Item
                  name="cityzenId"
                  noStyle
                  rules={[
                    { required: userById?.cityzenId ? false : true, message: "Cityzen ID is required" },
                    {
                      pattern: /^[0-9]*$/,
                      message: "Only numeric values are allowed!",
                    },
                    {
                      max: 13,
                      message: "Value should be max than 13 character",
                    },
                    {
                      min: 13,
                      message: "Value should be min than 13 character",
                    },
                  ]}
                >
                  <Input
                    placeholder="X-XXXX-XXXXX-XX-X"
                    defaultValue={userById?.cityzenId}
                  />
                </Form.Item>
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} xl={12} lg={12}>
              <Form.Item
                name="phone"
                label={t(`FORM_LABLE_PHONENUMBER`)}
                rules={[
                  {
                    required: userById?.phone ? false : true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                  defaultValue={userById?.phone}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col sm={12} xs={24} xl={12} lg={12}>
              <Form.Item label={t(`FORM_LABLE_PASSPORTNO`)}>
                <Form.Item
                  name="passportNo"
                  noStyle
                  rules={[
                    {  required: userById?.passportNo ? false : true, message: "PassportNo is required" },
                  ]}
                >
                  <Input
                    placeholder="Please input"
                    defaultValue={userById?.passportNo}
                  />
                </Form.Item>
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} xl={12} lg={12}>
              <Form.Item label={t(`FORM_LABLE_EXPECTED_SARALY`)}>
                <Form.Item
                
                  name="expectedSalary"
                  noStyle
                  rules={[
                    { required: userById?.expectedSalary ? false : true, message: "ExpectedSalary is required" },
                  ]}
                >
                  <Input
                    placeholder="Please input"
                    defaultValue={userById?.expectedSalary}
                  />
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item style={{ marginTop: "3rem" }}>
            <Space>
              <Button type="primary" htmlType="submit">
                {t(`BUTTON_SUBMIT`)}
              </Button>
              <Button htmlType="reset" onClick={onReset}>
                {t(`BUTTON_RESET`)}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalForm;
