import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import Layout from "../../../Layout/Layout";
import cl from "../CounterpartiesAdd/counterparties.module.scss";
import { Select, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import Recipients from "../../Recipients/RecipientsAdd/RecipientsContent";
import { BsPlusLg } from "react-icons/bs";
import { getUserDetail } from "../../../features/user/userActions";
import ConversationsContent from "../../Conversations/ConversationsAdd/ConversationsContent";
import {
  getGuarantor,
  getGuarantors,
} from "../../../features/guarantors/guarantorsActions";
import { getConversations } from "../../../features/conversations/conversationsActions";
import {
  getClients,
  patchClient,
} from "../../../features/clients/clientsActions";
import { getProperties } from "../../../features/property/propertyActions";
import Error from "../../../components/Error/Error";
import Success from "../../../components/Success/Success";
import Loading from "../../../components/Loading/Loading";
import PropertyContent from "../../Property/PropertyAdd/PropertyContent";
import { useNavigate } from "react-router";

const ClientIdPage = () => {
  //-----------API---------------------
  const dispatch = useDispatch();
  const { guarantors } = useSelector((state) => state.guarantor);
  const { properties } = useSelector((state) => state.property);
  const { conversations } = useSelector((state) => state.conversations);
  const { patchLoading, patchError, patchSuccess, clientInfo } = useSelector(
    (state) => state.counterparties
  );
  const [state, setState] = useState({});
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    token && dispatch(getUserDetail(token.access));
    dispatch(getGuarantors());
    dispatch(getProperties());
    dispatch(getConversations());
  }, [dispatch]);
  const submitForm = async (e) => {
    dispatch(patchClient({ id: clientInfo.id, obj: state })).then(() =>
      dispatch(getClients())
    );
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!clientInfo) navigate("/counterparties");
  }, []);
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  //---Modals----------------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const showModalTwo = () => {
    setIsModalOpenTwo(true);
  };
  const handleOkTwo = () => {
    setIsModalOpenTwo(false);
  };
  const handleCancelTwo = () => {
    setIsModalOpenTwo(false);
  };

  const [isModalOpenThree, setIsModalOpenThree] = useState(false);
  const showModalThree = () => {
    setIsModalOpenThree(true);
  };
  const handleOkThree = () => {
    setIsModalOpenThree(false);
  };
  const handleCancelThree = () => {
    setIsModalOpenThree(false);
  };
  //-------------------------------------------
  return (
    <Layout>
      {clientInfo && (
        <div>
          <Form
            className={cl.counterparties__content}
            name="basic"
            autoComplete="off"
            onFinish={submitForm}
            onFinishFailed={() => alert("?????????????????? ?????? ????????")}
          >
            <h2 className={cl.title}>
              {clientInfo.id}.{clientInfo.full_name}
            </h2>
            <h2>?????? ??????????????:</h2>
            <Input
              className={cl.counterparties__input}
              type="text"
              name="full_name"
              onChange={handleInput}
              defaultValue={clientInfo.full_name}
              maxLength="100"
            />
            {patchError && patchError.full_name && (
              <Error>{patchError.full_name}</Error>
            )}
            <h2>?????? ??????????????:</h2>
            <Select
              id="credit_type"
              className={cl.counterparties__accor}
              onChange={(e) => setState({ ...state, credit_type: e })}
              defaultValue={clientInfo.credit_type}
            >
              <Select.Option value="LS">????????????</Select.Option>
              <Select.Option value="CR">????????????</Select.Option>
            </Select>
            {patchError && patchError.credit_type && (
              <Error>{patchError.credit_type}</Error>
            )}
            <h2>???????????? ??????????????:</h2>
            <Select
              className={cl.counterparties__accor}
              onChange={(e) => setState({ ...state, status: e })}
              defaultValue={clientInfo.status}
            >
              <Select.Option value="success">??????????</Select.Option>
              <Select.Option value="processing">??????????????????</Select.Option>
              <Select.Option value="discussion">???? ????????????????????????</Select.Option>
              <Select.Option value="denied">????????????????</Select.Option>
              <Select.Option value="payback">
                ?????????????? ???? ???????? ??????????????????
              </Select.Option>
              <Select.Option value="judicial">????????????????</Select.Option>
            </Select>
            {patchError && patchError.status && (
              <Error>{patchError.status}</Error>
            )}

            {state.status == "payback" && (
              <>
                <h2>?????????????????? ??????????????????:</h2>

                <input
                  type="file"
                  onChange={(e) =>
                    setState({
                      ...state,
                      repaid_by_redemption: e.target.files[0],
                    })
                  }
                />
                <p className={cl.file__name}>
                  ?????????????? ???????? :{" "}
                  <a href={clientInfo.repaid_by_redemption}>
                    {clientInfo.repaid_by_redemption}
                  </a>
                </p>
                {patchError && patchError.repaid_by_redemption && (
                  <Error>{patchError.repaid_by_redemption}</Error>
                )}
              </>
            )}
            {state.status == "judicial" && (
              <>
                <h2>???????????????? ??????????????????:</h2>

                <input
                  type="file"
                  onChange={(e) =>
                    setState({
                      ...state,
                      court_documents: e.target.files[0],
                    })
                  }
                />
                <p className={cl.file__name}>
                  ?????????????? ???????? :{" "}
                  <a href={clientInfo.court_documents}>
                    {clientInfo.court_documents}
                  </a>
                </p>
                {patchError && patchError.court_documents && (
                  <Error>{patchError.court_documents}</Error>
                )}
              </>
            )}
            <h2>?????????? ??????????????:</h2>
            <div className={cl.block__input}>
              <span>?????????????? ???????????? ??????????</span>

              <Input
                className={cl.counterparties__input}
                type="text"
                name="credit_sum"
                onChange={handleInput}
                maxLength="30"
                defaultValue={clientInfo.credit_sum}
              />
              {patchError && patchError.credit_sum && (
                <Error>{patchError.credit_sum}</Error>
              )}
            </div>
            <h2>???????????????? ??????????????????:</h2>

            <Select
              className={cl.counterparties__accor}
              onChange={(e) => setState({ ...state, marital_status: e })}
              defaultValue={clientInfo.marital_status}
            >
              <Select.Option value="married">??????????/??????????????</Select.Option>
              <Select.Option value="divorced">????????????????</Select.Option>
              <Select.Option value="widow/widower">??????????/????????????</Select.Option>
              <Select.Option value="single">????????????/??????????????????</Select.Option>
            </Select>
            {patchError && patchError.marital_status && (
              <Error>{patchError.marital_status}</Error>
            )}
            <h2>?????????????????? ??????????????:</h2>
            <input
              type="file"
              onChange={(e) =>
                setState({
                  ...state,
                  credit_history: e.target.files[0],
                })
              }
            />
            <p className={cl.file__name}>
              ?????????????? ???????? :{" "}
              <a href={clientInfo.credit_history}>
                {clientInfo.credit_history}
              </a>
            </p>
            {patchError && patchError.credit_history && (
              <Error>{patchError.credit_history}</Error>
            )}
            <h2>?????????? ????????????????:</h2>

            <Input
              className={cl.counterparties__input}
              type="text"
              onChange={handleInput}
              name="phone"
              defaultValue={clientInfo.phone}
              maxLength="100"
            />
            {patchError && patchError.phone && (
              <Error>{patchError.phone}</Error>
            )}
            <h2>?????????? ????????????????:</h2>

            <Input
              className={cl.counterparties__input}
              type="text"
              onChange={handleInput}
              defaultValue={clientInfo.address}
              name="address"
              maxLength="100"
            />
            {patchError && patchError.address && (
              <Error>{patchError.address}</Error>
            )}
            <h2>?????????? ??????????????????????</h2>

            <Input
              className={cl.counterparties__input}
              type="text"
              placeholder="?????? ???? ?????? ?? ???? ????????????????"
              onChange={handleInput}
              defaultValue={clientInfo.client_actual_address}
              name="client_actual_address"
              maxLength="100"
            />
            {patchError && patchError.client_actual_address && (
              <Error>{patchError.client_actual_address}</Error>
            )}
            <h2>?????????????? ?? ??????????????:</h2>
            <input
              type="file"
              onChange={(e) =>
                setState({
                  ...state,
                  income_statement: e.target.files[0],
                })
              }
            />
            <p className={cl.file__name}>
              ?????????????? ???????? :{" "}
              <a href={clientInfo.income_statement}>
                {clientInfo.income_statement}
              </a>
            </p>
            {patchError && patchError.income_statement && (
              <Error>{patchError.income_statement}</Error>
            )}
            <h2>???????????????? ?? ???????????????????????? ?? ????????????????????????:</h2>

            <input
              type="file"
              onChange={(e) =>
                setState({
                  ...state,
                  contracts: e.target.files[0],
                })
              }
            />
            <p className={cl.file__name}>
              ?????????????? ???????? :{" "}
              <a href={clientInfo.contracts}>{clientInfo.contracts}</a>
            </p>
            {patchError && patchError.contracts && (
              <Error>{patchError.contracts}</Error>
            )}
            <h2>?????????? ?????????????????????? ?? ?????????????????????? ???? ?????????????????? ????????????:</h2>
            <input
              type="file"
              onChange={(e) =>
                setState({
                  ...state,
                  report: e.target.files[0],
                })
              }
            />
            <p className={cl.file__name}>
              ?????????????? ???????? : <a href={clientInfo.report}>{clientInfo.report}</a>
            </p>
            {patchError && patchError.report && (
              <Error>{patchError.report}</Error>
            )}
            <h2>?????????? ???? ??????????????????????:</h2>

            <input
              type="file"
              onChange={(e) =>
                setState({
                  ...state,
                  monitoring_report: e.target.files[0],
                })
              }
            />
            <p className={cl.file__name}>
              ?????????????? ???????? :  <a href={clientInfo.monitoring_report}>{clientInfo.monitoring_report}</a>
            </p>
            {patchError && patchError.monitoring_report && (
              <Error>{patchError.monitoring_report}</Error>
            )}
            <h2>????????????????????:</h2>
            <div className={cl.counterparties__flexContainer}>
              <Select
                className={cl.counterparties__accor}
                showSearch
                allowClear
                onChange={(e) => {
                  setState({ ...state, guarantor: e });
                }}
                defaultValue={{
                  label: clientInfo.guarantor,
                  value: clientInfo.guarantor,
                }}
                fieldNames={{ label: "full_name", value: "id" }}
                filterOption={(input, option) =>
                  (option?.full_name.toLocaleLowerCase() ?? "").includes(
                    input.toLocaleLowerCase()
                  )
                }
                options={guarantors && guarantors}
              />
              <BsPlusLg className={cl.add__svg} onClick={showModal} />
            </div>
            {patchError && patchError.guarantor && (
              <Error>{patchError.guarantor}</Error>
            )}
            <h2>?????????????????? ??????????????????:</h2>
            <div className={cl.counterparties__flexContainer}>
              <Select
                className={cl.counterparties__accor}
                showSearch
                allowClear
                defaultValue={{
                  label: clientInfo.id_property,
                  value: clientInfo.id_property,
                }}
                fieldNames={{ label: "type", value: "id" }}
                onChange={(e) => {
                  setState({ ...state, id_property: e });
                }}
                filterOption={(input, option) =>
                  (option?.type.toLocaleLowerCase() ?? "").includes(
                    input.toLocaleLowerCase()
                  )
                }
                options={properties && properties}
              />
              <BsPlusLg className={cl.add__svg} onClick={showModalTwo} />
            </div>
            {patchError && patchError.id_property && (
              <Error>{patchError.id_property}</Error>
            )}
            <h2>????????????????????:</h2>
            <div>
              <div className={cl.counterparties__flexContainer}>
                <Select
                  className={cl.counterparties__accor}
                  showSearch
                  allowClear
                  defaultValue={{
                    label: clientInfo.meet_conversation,
                    value: clientInfo.meet_conversation,
                  }}
                  onChange={(e) => {
                    setState({ ...state, meet_conversation: e });
                  }}
                  fieldNames={{ label: "name", value: "id" }}
                  filterOption={(input, option) =>
                    (option?.name.toLocaleLowerCase() ?? "").includes(
                      input.toLocaleLowerCase()
                    )
                  }
                  options={conversations && conversations}
                />
                <BsPlusLg className={cl.add__svg} onClick={showModalThree} />
              </div>
              {patchError && patchError.meet_conversation && (
                <Error>{patchError.meet_conversation}</Error>
              )}
            </div>
            {patchLoading && <Loading>????????????????...</Loading>}
            {patchError && (
              <Error style={{ fontSize: "20px" }}>
                ???????????? ???? ???????? ????????????????????. ?????????????????? ???????????????????????? ????????????????????
                ????????????.
              </Error>
            )}
            {patchSuccess && <Success>???????????? ?????????????? ????????????????.</Success>}
            <Button>??????????????????</Button>
          </Form>
          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Recipients />
          </Modal>
          <Modal
            open={isModalOpenTwo}
            onOk={handleOkTwo}
            onCancel={handleCancelTwo}
          >
            <PropertyContent />
          </Modal>
          <Modal
            open={isModalOpenThree}
            onOk={handleOkThree}
            onCancel={handleCancelThree}
          >
            <ConversationsContent />
          </Modal>
        </div>
      )}
    </Layout>
  );
};

export default ClientIdPage;
