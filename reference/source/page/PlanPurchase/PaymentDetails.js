import { Accordion } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getPlanPaymentDetails,
  tryGetPlanTransaction,
  updateTransactionDetail,
  getSearchData,
  getTransactionDetails,
  getMethods,
} from "../../api/plan";
import { useSearchParams } from "react-router-dom";
import PopUp from "../../components/PopUp";
import { IS_LOADING, SHOW_SNACKBAR } from "../../utils/types";
import { generateTokenByApiKey } from "../../api/login";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Autocomplete, TextField } from "@mui/material";

function PaymentDetails() {
  const dispatch = useDispatch();
  const [token, setToken] = useState({});
  const [orderDetail, setOrderDetail] = useState({});
  const [showFailed, setShowFailed] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [searchParams] = useSearchParams();
  const [allCity, setAllCity] = useState([]);
  const [payMethod, setPayMethod] = useState([]);

  useEffect(() => {
    const keys = JSON.parse(process.env.REACT_APP_API_KEYS);
    const key = keys.find(
      (f) => f.tenantId === searchParams.get("tenantId")?.toUpperCase()
    );
    if (!key) {
      dispatch({
        type: SHOW_SNACKBAR,
        payload: { type: "error", message: "invalid tenant", open: true },
      });
      return;
    }
    dispatch(
      generateTokenByApiKey(
        {},
        "zealthix",
        {
          "x-tenant-id": key.tenantId,
          "X-Api-Key": key.key,
          "Content-Type": "application/json",
        },
        (t) => {
          if (t?.access_token) {
            setToken(t);
            dispatch(
              getPlanPaymentDetails(
                searchParams.get("transactionId")?.toUpperCase(),
                t.access_token,
                async (order) => {
                  if (order?.status === "REQUESTED") {
                    await getCityQuery(
                      order?.detail?.address?.city,
                      t.access_token
                    );
                    await setOrderDetail(order);
                  } else {
                    dispatch({
                      type: SHOW_SNACKBAR,
                      payload: {
                        type: "error",
                        message: "invalid transactionId",
                        open: true,
                      },
                    });
                  }
                }
              )
            );
          } else {
            dispatch({
              type: SHOW_SNACKBAR,
              payload: {
                type: "error",
                message: "unauthorized, not allowed",
                open: true,
              },
            });
          }
        }
      )
    );
  }, []);

  const getTransaction = (transactionId) => {
    dispatch({
      type: IS_LOADING,
      payload: { type: IS_LOADING, payload: true },
    });
    tryGetPlanTransaction(transactionId, token?.access_token).then((res) => {
      if (res?.status === "SUCCESS") {
        setShowCongratulations(true);
        setShowFailed(false);
        dispatch({
          type: IS_LOADING,
          payload: { type: IS_LOADING, payload: false },
        });
      } else {
        if (!res?.transactionId) {
          dispatch({
            type: SHOW_SNACKBAR,
            payload: {
              type: "error",
              message:
                (res?.data?.description
                  ? res?.data?.description
                  : res?.data?.message) ?? "Please contact with administrator",
              open: true,
            },
          });
        }
        setShowFailed(true);
        setShowCongratulations(false);
        dispatch({
          type: IS_LOADING,
          payload: { type: IS_LOADING, payload: false },
        });
      }
    });
  };

  const getPayMethods = () => {
    dispatch(
      getMethods(
        searchParams.get("tenantId")?.toUpperCase(),
        token?.access_token,
        (res) => {
          setPayMethod(res);
          // you can now do anything with `res`
        }
      )
    );
  };
  useEffect(() => {
    if (token?.access_token) {
      getPayMethods();
    }
  }, [token?.access_token]);

  const onSaveClick = (e) => {
    e.preventDefault();
    switch (e.nativeEvent.submitter?.value) {
      case "edit":
        setIsEdit(true);
        break;
      case "save":
        dispatch(
          updateTransactionDetail(orderDetail, token?.access_token, (order) => {
            setOrderDetail(order);
            setIsEdit(false);
          })
        );
        break;
    }
  };

  const requestPayment = (method) => {
    dispatch(
      getTransactionDetails(
        {
          transactionId: orderDetail.transactionId,
          detail: {
            paymentGatewayType: method,
          },
        },
        token?.access_token,
        (d) => {
          if (method === "RAZORPAY") {
            onPayClick(d);
          } else if (method === "CASHFREE") {
            cashfreeFun(d);
          }
        }
      )
    );
  };

  const getCityQuery = (searchText, token) => {
    dispatch(
      getSearchData(
        {
          searchTerm: searchText,
          entityType: "CITY",
        },
        token,
        (r) => {
          const finalData = r?.data?.map((item, i) => {
            return {
              value: item.code,
              label: item?.name,
            };
          });
          setAllCity(finalData || []);
        }
      )
    );
  };

  const onPayClick = (order) => {
    const options = {
      key: order.keyId,
      amount: order.payableAmount,
      currency: "INR",
      name: order.businessName,
      description: order.planName,
      order_id: order.paymentOrderId, // Order ID from backend
      handler: function (response) {
        getTransaction(order.transactionId);
      },
      prefill: {
        name: order.detail?.name,
        email: order.detail?.email,
        contact: order.detail?.phone,
      },
      notes: {
        transactionId: order.transactionId,
        planCode: order.planCode,
        tenantId: order.tenantId,
        type: "PLAN_PURCHASE",
      },
      theme: {
        color: "#123B7C",
      },
      modal: {
        ondismiss: function () {
          // User canceled the payment
          console.log("Payment modal dismissed by the user.");
        },
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();

    // Handle payment failures
    rzp.on("payment.failed", function (response) {
      console.log(`Payment failed: ${response.error.description}`);
    });
  };

  const cashfreeFun = (order) => {
    try {
      dispatch({
        type: IS_LOADING,
        payload: { type: IS_LOADING, payload: true },
      });
      const cashfree = window.Cashfree({
        mode: "production",
      });
      let checkoutOptions = {
        redirect: false,
        redirectTarget: "_blank",
        paymentSessionId: order?.paymentSessionId,
        returnUrl: `${process.env.REACT_APP_CURRENT_URL}payment?tenantId=${orderDetail.tenantId} && transactionId=${orderDetail.transactionId}`,
      };
      cashfree.checkout(checkoutOptions).then(function (result) {
        if (result.error) {
          alert(result.error.message);
        }
      });
    } catch (err) {
      console.error("Error:", err);
      alert("Error initiating payment");
    }
  };

  const OnInput = (e) =>
    (e.target.value = e.target.value.slice(0, e.target.dataset.maxlength));
  return (
    <>
      {/* <div class="cotnainer mt-[150px]">
        <div class="row">
          <div class="col-lg-10 offset-lg-1">
            <div class="site-heading text-center">
              <h4 class="sub-title">Magma OPD</h4>
              <h2 class="title">Payment Summary</h2>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container  mt-[170px] max-[767px]:container-fluid max-[767px]:mx-0">
        <div className="_paymentPage ">
          <div className="leftDetails grid grid-cols-2 gap-[20px]">
            <div className="col-span-2 leftSide">
              <div className="flex items-center gap-[60px] max-[767px]:block">
                <div className="text-[#04000b]">
                  <span className="font-[600] text-black">
                    Application Number:
                  </span>
                  {orderDetail?.transactionId}
                </div>
                <div className="text-[#04000b] max-[767px]:my-4">
                  <span className="font-[600] text-black">Plan Name: </span>
                  {orderDetail?.planName}
                </div>
                <div className="text-[#04000b]">
                  <span className="font-[600] text-black">Coverage: </span>
                  {orderDetail?.plan?.members > 0 ? "Family" : "Self"}
                </div>
              </div>
            </div>
            <div className="text-[#04000b] col-span-2 rightSide">
              <div className="font-[600] text-black common_heading">
                Benefits:
              </div>
              <div
                key={orderDetail?.plan?.planConfig?.planHtml}
                dangerouslySetInnerHTML={{
                  __html: orderDetail?.plan?.planConfig?.planHtml,
                }}
              ></div>
            </div>
          </div>

          <div className="memberDetails">
            <div className="font-[600] text-black mb-[16px] mt-[40px]">
              Customer Details:
            </div>
            <div className=" border-[0px] border-[#F3F5FA] rounded-[16px] broker">
              <div className="text-[#04000b]">
                <form onSubmit={onSaveClick} className="text-[14px] grid gap-4">
                  {/* For Self */}
                  <Accordion className="accordion-force-light">
                    <Accordion.Panel>
                      <Accordion.Title className="py-2 customFontSize accordion-force-light">
                        Self
                      </Accordion.Title>
                      <Accordion.Content className="p-[20px]">
                        <div className="grid min-[651px]:grid-cols-2 max-[650px]:grid-cols-1 gap-4">
                          <div className={`flex flex-col col-span-1`}>
                            <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                              <label>Name</label>
                            </div>
                            <input
                              placeholder="Name *"
                              autoFocus
                              type="text"
                              disabled={!isEdit}
                              required
                              value={orderDetail?.detail?.name}
                              className={
                                (isEdit
                                  ? "border-[1px] border-[#F3F5FA]"
                                  : "bg-[#F3F5FA]") +
                                " text-gray-500 font-normal w-full rounded skipthis cu_details"
                              }
                              onChange={(e) => {
                                setOrderDetail({
                                  ...orderDetail,
                                  detail: {
                                    ...orderDetail?.detail,
                                    name: e.target.value,
                                  },
                                });
                              }}
                            />
                          </div>
                          <div className={`flex flex-col col-span-1`}>
                            <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                              <label>Father/Husband Name</label>
                            </div>
                            <input
                              placeholder="Father/Husband Name *"
                              autoFocus
                              type="text"
                              disabled={!isEdit}
                              required
                              value={orderDetail?.detail?.guardianName}
                              className={
                                (isEdit
                                  ? "border-[1px] border-[#F3F5FA]"
                                  : "bg-[#F3F5FA]") +
                                " text-gray-500 font-normal w-full rounded skipthis cu_details"
                              }
                              onChange={(e) => {
                                setOrderDetail({
                                  ...orderDetail,
                                  detail: {
                                    ...orderDetail?.detail,
                                    guardianName: e.target.value,
                                  },
                                });
                              }}
                            />
                          </div>

                          <div className={`flex flex-col col-span-1`}>
                            <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                              <label>Email</label>
                            </div>
                            <input
                              placeholder="Email *"
                              type="email"
                              disabled={!isEdit}
                              required
                              value={orderDetail?.detail?.email}
                              className={
                                (isEdit
                                  ? "border-[1px] border-[#F3F5FA]"
                                  : "bg-[#F3F5FA]") +
                                " text-gray-500 font-normal w-full rounded skipthis cu_details"
                              }
                              onChange={(e) =>
                                setOrderDetail({
                                  ...orderDetail,
                                  detail: {
                                    ...orderDetail?.detail,
                                    email: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>

                          <div className={`flex flex-col col-span-1`}>
                            <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                              <label>Phone Number</label>
                            </div>
                            <input
                              placeholder="Phone *"
                              type="number"
                              disabled={!isEdit}
                              required
                              value={orderDetail?.detail?.phone}
                              className={
                                (isEdit
                                  ? "border-[1px] border-[#F3F5FA]"
                                  : "bg-[#F3F5FA]") +
                                " text-gray-500 font-normal w-full rounded skipthis cu_details"
                              }
                              onChange={(e) =>
                                setOrderDetail({
                                  ...orderDetail,
                                  detail: {
                                    ...orderDetail?.detail,
                                    phone: e.target.value,
                                  },
                                })
                              }
                              data-maxlength={10}
                              onInput={OnInput}
                            />
                          </div>

                          <div className={`flex flex-col col-span-1`}>
                            <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                              <label>DOB</label>
                            </div>
                            <input
                              placeholder="DOB *"
                              type="date"
                              disabled={!isEdit}
                              required
                              value={orderDetail?.detail?.dob}
                              className={
                                (isEdit
                                  ? "border-[1px] border-[#F3F5FA]"
                                  : "bg-[#F3F5FA]") +
                                " text-gray-500 font-normal w-full rounded skipthis cu_details"
                              }
                              onChange={(e) =>
                                setOrderDetail({
                                  ...orderDetail,
                                  detail: {
                                    ...orderDetail?.detail,
                                    dob: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>

                          <div className={`flex flex-col col-span-1`}>
                            <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                              <label>Gender</label>
                            </div>
                            <select
                              disabled={!isEdit}
                              id="gender"
                              className="text-[14px] h-[42px] min-h-[42px] w-full justify-center p-[10px] font-[500] bg-[#f7f8fc] rounded-[8px] shadow-input outline-none border-none text-black tracking-[-0.02em] placeholder:text-[#CFD2DC] focus:bg-white"
                              value={orderDetail?.detail?.gender}
                              name="gender"
                              onChange={(e) =>
                                setOrderDetail({
                                  ...orderDetail,
                                  detail: {
                                    ...orderDetail?.detail,
                                    gender: e.target.value,
                                  },
                                })
                              }
                            >
                              <option value="" disabled selected>
                                Select Gender
                              </option>
                              <option value="MALE">Male</option>
                              <option value="FEMALE">Female</option>
                            </select>
                          </div>
                          {/* <div className={`flex flex-col col-span-1`}>
                            <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                              <label>Pan Card</label>
                            </div>
                            <input
                              placeholder="PanCard *"
                              type="text"
                              required
                              className="w-full pr-[55px]"
                              value={orderDetail?.detail?.panCard}
                              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                              onChange={(e) =>
                                setOrderDetail({
                                  ...orderDetail,
                                  detail: {
                                    ...orderDetail?.detail,
                                    panCard: e.target.value,
                                  },
                                })
                              }
                              maxLength={10}
                              onInput={(e) => {
                                e.target.value = e.target.value
                                  .toUpperCase()
                                  .replace(/[^A-Z0-9]/g, "");
                                e.target.value = e.target.value.slice(0, 10);
                              }}
                            />
                          </div> */}
                          <div className={`flex flex-col col-span-1`}>
                            <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                              <label>Address</label>
                            </div>
                            <input
                              placeholder="Address *"
                              autoFocus
                              type="text"
                              disabled={!isEdit}
                              required
                              value={orderDetail?.detail?.address?.addressLine}
                              className={
                                (isEdit
                                  ? "border-[1px] border-[#F3F5FA]"
                                  : "bg-[#F3F5FA]") +
                                " text-gray-500 font-normal w-full rounded skipthis cu_details"
                              }
                              onChange={(e) => {
                                setOrderDetail({
                                  ...orderDetail,
                                  detail: {
                                    ...orderDetail?.detail,
                                    address: {
                                      ...orderDetail.detail.address,
                                      addressLine: e.target.value,
                                    },
                                  },
                                });
                              }}
                            />
                          </div>
                          <div className="col-span-1 flex flex-col">
                            <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                              Enter city
                            </div>
                            <Autocomplete
                              size="small"
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  onInput={(e) =>
                                    getCityQuery(
                                      e.target.value,
                                      token?.access_token
                                    )
                                  }
                                  placeholder="Search..."
                                />
                              )}
                              value={
                                allCity.find(
                                  (option) =>
                                    option.label ===
                                    orderDetail?.detail?.address?.city
                                ) || null
                              }
                              options={allCity}
                              onChange={(e, newValue) => {
                                if (newValue) {
                                  setOrderDetail({
                                    ...orderDetail,
                                    detail: {
                                      ...orderDetail?.detail,
                                      address: {
                                        ...orderDetail.detail.address,
                                        cityCode: newValue?.value,
                                        city: newValue?.label,
                                      },
                                    },
                                  });
                                }
                              }}
                              sx={{
                                backgroundColor: "#f7f8fc",
                                boxShadow: "none",
                                border: "none",
                                "&:hover": {
                                  boxShadow: "none",
                                  backgroundColor: "#f7f8fc",
                                  border: "none", // Background on hover
                                },
                                "& .MuiOutlinedInput-root": {
                                  backgroundColor: "#f7f8fc",
                                  boxShadow: "none",
                                  border: "none",
                                  "&:focus-within": {
                                    backgroundColor: "#f7f8fc",
                                    border: "none", // Change background on focus
                                  },
                                },
                                input: {
                                  boxShadow: "none !important",
                                  border: "none !important",
                                  background: "#f7f8fc !important",
                                },
                                "input:focus": {
                                  boxShadow: "none !important",
                                  border: "none !important",
                                  background: "#f7f8fc !important",
                                },
                              }}
                            />
                          </div>
                          <div className={`flex flex-col col-span-1`}>
                            <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                              <label>Pin Code</label>
                            </div>
                            <input
                              placeholder="Pincode *"
                              autoFocus
                              type="text"
                              disabled={!isEdit}
                              required
                              value={orderDetail?.detail?.address?.pincode}
                              className={
                                (isEdit
                                  ? "border-[1px] border-[#F3F5FA]"
                                  : "bg-[#F3F5FA]") +
                                " text-gray-500 font-normal w-full rounded skipthis cu_details"
                              }
                              onChange={(e) => {
                                setOrderDetail({
                                  ...orderDetail,
                                  detail: {
                                    ...orderDetail?.detail,
                                    address: {
                                      ...orderDetail?.detail?.address,
                                      pincode: e.target.value, // Updating only addressLine
                                    },
                                  },
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="w-[100%] justify-end flex items-end max-[650px]:mt-4 mt-2">
                          {isEdit ? (
                            <button
                              type="submit"
                              value={"save"}
                              className="min-w-[76px]  text-center px-[16px] py-[6px] text-white font-medium text-[14px] transition-all ease-in-out rounded-lg cursor-pointer bg-brandGreen-500 hover:bg-brandGreen-600"
                            >
                              Save Details
                            </button>
                          ) : (
                            <button
                              className="cursor-pointer"
                              type="submit"
                              value={"edit"}
                            >
                              <i className="fa-solid cursor-pointer fa-pen-to-square text-[18px] text-[#383C50]"></i>
                            </button>
                          )}
                        </div>
                      </Accordion.Content>
                    </Accordion.Panel>
                  </Accordion>

                  {orderDetail?.detail?.members?.map((m, i) => (
                    <Accordion className="accordion-force-light">
                      <Accordion.Panel>
                        <Accordion.Title className="py-2 accordion-force-light">
                          Member {i + 1}
                        </Accordion.Title>
                        <Accordion.Content className="p-[20px]">
                          <div className="grid grid-cols-2 gap-4">
                            <div className={`flex flex-col col-span-1`}>
                              <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                                <label>Name</label>
                              </div>
                              <input
                                placeholder="Name *"
                                autoFocus
                                type="text"
                                disabled={!m.isEdit}
                                value={m?.name}
                                className={
                                  (m.isEdit
                                    ? "border-[1px] border-[#F3F5FA]"
                                    : "bg-[#F3F5FA]") +
                                  " text-gray-500 font-normal w-full rounded skipthis cu_details"
                                }
                                onChange={(e) => {
                                  orderDetail.detail.members[i].name =
                                    e.target.value;
                                  setOrderDetail({ ...orderDetail });
                                }}
                              />
                            </div>

                            <div className={`flex flex-col col-span-1`}>
                              <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                                <label>Email</label>
                              </div>
                              <input
                                placeholder="Email *"
                                type="email"
                                disabled={!m.isEdit}
                                value={m?.email}
                                className={
                                  (m.isEdit
                                    ? "border-[1px] border-[#F3F5FA]"
                                    : "bg-[#F3F5FA]") +
                                  " text-gray-500 font-normal w-full rounded skipthis cu_details"
                                }
                                onChange={(e) => {
                                  orderDetail.detail.members[i].email =
                                    e.target.value;
                                  setOrderDetail({ ...orderDetail });
                                }}
                              />
                            </div>
                            <div className={`flex flex-col col-span-1`}>
                              <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                                <label>Phone Number</label>
                              </div>
                              <input
                                placeholder="Phone *"
                                type="number"
                                disabled={!m.isEdit}
                                value={m?.phone}
                                className={
                                  (m.isEdit
                                    ? "border-[1px] border-[#F3F5FA]"
                                    : "bg-[#F3F5FA]") +
                                  " text-gray-500 font-normal w-full rounded skipthis cu_details"
                                }
                                onChange={(e) => {
                                  orderDetail.detail.members[i].phone =
                                    e.target.value;
                                  setOrderDetail({ ...orderDetail });
                                }}
                                data-maxlength={10}
                                onInput={OnInput}
                              />
                            </div>

                            <div className={`flex flex-col col-span-1`}>
                              <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                                <label>DOB</label>
                              </div>
                              <input
                                placeholder="DOB *"
                                type="date"
                                disabled={!m.isEdit}
                                required
                                value={m?.dob}
                                className={
                                  (m.isEdit
                                    ? "border-[1px] border-[#F3F5FA]"
                                    : "bg-[#F3F5FA]") +
                                  " text-gray-500 font-normal w-full rounded skipthis cu_details"
                                }
                                onChange={(e) => {
                                  orderDetail.detail.members[i].dob =
                                    e.target.value;
                                  setOrderDetail({ ...orderDetail });
                                }}
                              />
                            </div>

                            <div className={`flex flex-col col-span-1`}>
                              <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                                <label>Gender</label>
                              </div>
                              <select
                                id="gender"
                                disabled={!m.isEdit}
                                className="text-[14px] h-[42px] min-h-[42px] w-full justify-center p-[10px] font-[500] bg-[#f7f8fc] rounded-[8px] shadow-input outline-none border-none text-black tracking-[-0.02em] placeholder:text-[#CFD2DC] focus:bg-white"
                                value={m.gender}
                                name="gender"
                                onChange={(e) => {
                                  orderDetail.detail.members[i].gender =
                                    e.target.value;
                                  setOrderDetail({ ...orderDetail });
                                }}
                              >
                                <option value="" disabled selected>
                                  Select Gender
                                </option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                              </select>
                            </div>

                            <div className={`flex flex-col col-span-1`}>
                              <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                                <label>Relation</label>
                              </div>
                              <select
                                id="gender"
                                disabled={!m.isEdit}
                                className="text-[14px] h-[42px] min-h-[42px] w-full justify-center p-[10px] font-[500] bg-[#f7f8fc] rounded-[8px] shadow-input outline-none border-none text-black tracking-[-0.02em] placeholder:text-[#CFD2DC] focus:bg-white"
                                value={m.relation}
                                name="gender"
                                onChange={(e) => {
                                  orderDetail.detail.members[i].relation =
                                    e.target.value;
                                  setOrderDetail({ ...orderDetail });
                                }}
                              >
                                <option value="" disabled selected>
                                  Select Relation
                                </option>
                                <option value="SPOUSE">Spouse</option>
                                <option value="PARENT">Parent</option>
                                <option value="CHILD">Child</option>
                                <option value="PARENT_IN_LAW">
                                  Parent In Law
                                </option>
                                <option value="SIBLING">Sibling</option>
                              </select>
                            </div>
                          </div>
                          <div className="w-[100%] justify-end flex items-end mt-4">
                            {m.isEdit ? (
                              <button
                                type="submit"
                                value={"save"}
                                className="min-w-[76px]  text-center px-[16px] py-[6px] text-white font-medium text-[14px] transition-all ease-in-out rounded-lg cursor-pointer bg-brandGreen-500 hover:bg-brandGreen-600"
                              >
                                Save Details
                              </button>
                            ) : (
                              <a
                                value={"edit"}
                                onClick={() => {
                                  orderDetail.detail.members[i].isEdit = true;
                                  setOrderDetail({ ...orderDetail });
                                }}
                              >
                                <i className="fa-solid fa-pen-to-square text-[18px] text-[#383C50]"></i>
                              </a>
                            )}
                          </div>
                        </Accordion.Content>
                      </Accordion.Panel>
                    </Accordion>
                  ))}
                </form>
              </div>
            </div>
          </div>

          <div className="planSummary">
            <p className="text-[#383C50] font-[600] mt-[40px] mb-[16px]">
              Payment Summary
            </p>

            <div className="grid grid-cols-2 gap-4 items-end paymentDetailSummary">
              <div className="col-span-1 paymentDetails pd1">
                <div className="text-[14px] text-[#04000b]">
                  <span className="font-[600]">Plan Name:</span>
                  {orderDetail?.planName}
                </div>
                <div>
                  <div className="text-[14px] text-[#04000b]">
                    <span className="font-[600]">Subtotal:</span> ₹
                    {orderDetail?.amount}
                  </div>
                  <div className="text-[14px] text-[#04000b]">
                    <span className="font-[600]">GST:</span> ₹
                    {orderDetail?.taxAmount}
                  </div>
                </div>
              </div>
              <div className="col-span-1 paymentDetails pd2 text-center">
                <div className="font-bold text-[36px] text-[#123B7C]">
                  ₹{orderDetail?.payableAmount}
                </div>
                <div className="text-[14px] text-[#04000b] font-semibold">
                  Total Payable
                </div>
              </div>
              <div className="col-span-2 my-4">
                <div className="flex gap-3 mt-3">
                  {payMethod?.map((item, i) => {
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          requestPayment(item);
                        }}
                        className={`w-full py-3 uppercase text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 ${
                          item === "RAZORPAY"
                            ? "bg-[#123B7C] hover:bg-[#0D2E63] shadow-brand"
                            : "bg-brandGreen-500 hover:bg-brandGreen-600 shadow-[0_8px_20px_rgba(22,163,74,0.18)]"
                        } `}
                      >
                        Pay with <span>{item?.toLowerCase()}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Summary Ends Here */}
        <PopUp
          ModalHeader={<></>}
          isShowModal={showCongratulations}
          setIsShowModal={setShowCongratulations}
          ModalBody={
            <div
              className="broker"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 5,
                marginBottom: 10,
              }}
            >
              <div className="pb-2 text-center justify-center flex flex-col items-center gap-2 lottieFiles">
                <DotLottieReact
                  src="https://lottie.host/d9e78d76-07eb-4451-8248-8cc69cd747ce/kBHwmnleyx.lottie"
                  loop
                  autoplay
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifySelf: "center",
                }}
              >
                <h4
                  className="head"
                  style={{
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Congratulations <br />
                  <span style={{ fontWeight: 400 }}>
                    You have successfully purchased the Plan&nbsp;
                    <strong>{orderDetail?.planName}</strong>.
                  </span>
                </h4>
              </div>
              <p style={{ fontSize: 14, paddingTop: 7, textAlign: "center" }}>
                You will soon receive the app access credentials to unlock your
                plan and start benefiting from it. For any queries you can write
                to us at <br />
                <strong>{orderDetail?.contactEmail}</strong>
              </p>
              <div className="flex justify-center items-center mt-3">
                <a
                  className="min-w-[76px] text-center mb-2 py-[13px] px-[20px] text-[#123B7C] hover:text-[#0D2E63] font-medium text-[16px] linear-block transition-all ease-in-out rounded cursor-pointer"
                  href="/plans"
                  target="_top"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-arrow-left mr-3"></i>
                  Back to plan page
                </a>
              </div>
            </div>
          }
          size="lg"
        />
        <PopUp
          ModalHeader={
            <div className="text-black font-medium box-border flex justify-between items-end broker">
              <h5>Payment Failed</h5>
            </div>
          }
          isShowModal={showFailed}
          setIsShowModal={(flag) => {
            setShowFailed(flag);
          }}
          ModalBody={
            <div
              className="broker"
              style={{ backgroundColor: "#ffffff", marginBottom: 10 }}
            >
              <div className="pb-2 text-center justify-center flex flex-col items-center gap-2">
                <DotLottieReact
                  src="https://lottie.host/452c79d0-93d5-4b58-931c-57a632afd4ea/XExsmpOfBI.lottie"
                  loop
                  autoplay
                />
              </div>

              <h3 className="text-[18px] text-center font-[600] text-[#EA4335]">
                Payment Unsuccessful
              </h3>
              <p style={{ fontSize: 16, paddingTop: 7, textAlign: "center" }}>
                We regret to inform you that your recent payment attempt for the
                Plan
                <span className="mx-1" style={{ fontWeight: 600 }}>
                  {orderDetail?.planName}
                </span>
                was unsuccessful.
              </p>
              <div className="text-center text-[14px]">
                <p className="text-gray-500">Transaction Details:</p>
                <p>
                  <label className="text-gray-500 px-2">Amount:</label>
                  {orderDetail?.payableAmount}
                </p>
                <p>
                  <label className="text-gray-500 px-2">transaction ID:</label>
                  {orderDetail?.transactionId}
                </p>
                <p>
                  <label className="text-gray-500 px-2">Order ID:</label>
                  {orderDetail?.paymentOrderId}
                </p>
              </div>
              <p style={{ fontSize: 14, paddingTop: 7, textAlign: "center" }}>
                You will soon receive the app access credentials to unlock your
                plan and start benefiting from it. For any queries you can write
                to us at
                <a
                  href={`mailto:${orderDetail?.contactEmail}`}
                  className="font-semibold"
                >
                  {orderDetail?.contactEmail}
                </a>
              </p>
            </div>
          }
          size="lg"
        />
      </div>
    </>
  );
}

export default PaymentDetails;
