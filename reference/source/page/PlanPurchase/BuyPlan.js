import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  planPurchaseRequest,
  tryGetPlanTransaction,
  SendOTP,
  getSearchData,
} from "../../api/plan";
import { generateTokenByApiKey } from "../../api/login";
import { IS_LOADING, SHOW_SNACKBAR } from "../../utils/types";
import BrokerPopup from "../../components/BrokerPopup";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Accordion } from "flowbite-react";
import PopUp from "../../components/PopUp";
import OtpInput from "../../components/OtpInput";
import { getRandomString } from "../../utils/helper";
import { Autocomplete, TextField } from "@mui/material";
import { getAgents } from "../../api/plan";

function BuyPlan({
  tenantId,
  planCode,
  showPopUp = false,
  setShowPopUp,
  isRider,
  showMember = false,
  memberCount,
  showRC,
}) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ gender: "MALE" });
  const [applicationNumber, setApplicationNumber] = useState();
  const [token, setToken] = useState({});
  const [members, setMembers] = useState([]);
  //const [showPopUp, setShowPopUp] = useState(fa);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [orderDetail, setOrderDetail] = useState({});
  //const [searchParams] = useSearchParams();
  const [openVerify, setOpenVerify] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [agentPhone, setAgentPhone] = useState("");
  const [verifyEmail, setVerifyEmail] = useState({
    verified: false,
  });
  const [verifyPhone, setVerifyPhone] = useState({
    verified: false,
  });
  const [allCity, setAllCity] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [agent, setAgent] = useState({});
  const [isAgentInvolved, setIsAgentInvolved] = useState(false); 

  useEffect(() => {
    const keys = JSON.parse(process.env.REACT_APP_API_KEYS);
    const key = keys.find((f) => f.tenantId === tenantId);
    if (!key) {
      setShowPopUp(false);
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
          if (t.access_token) {
            setToken(t);
          } else {
            setShowPopUp(false);
          }
        }
      )
    );
  }, [tenantId]);
  useEffect(() => {
    if (memberCount) {
      // Create dynamic members based on plan count
      const initialMembers = Array.from({ length: memberCount }, () => ({
        gender: "MALE",
        relation: "CHILD",
      }));
      setMembers(initialMembers);
    } else {
      setMembers([]);
    }
  }, [memberCount]);

  useEffect(() => {
    setApplicationNumber(
      `O${getRandomString(2, planCode)}${Date.now().toString(36)}`.toUpperCase()
    );
  }, [showPopUp]);

  const getOtp = (type, address) => {
    dispatch(
      SendOTP({ type: type, verify: address }, token?.access_token, (d) => {
        setOpenVerify(true);
      })
    );
  };

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

  const getCityQuery = (searchText) => {
    dispatch(
      getSearchData(
        {
          searchTerm: searchText,
          entityType: "CITY",
        },
        token?.access_token,
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

  const GetAgent = () => {
    const postData = {
      count: true,
      size: 100,
      offset: 0,
      criteria: {
        tenantId: tenantId,
        phone: agentPhone,
      },
    };
    dispatch(
      getAgents(postData, token?.access_token, (d) => {
        if (d?.count > 0) {
          setAgent(d?.data?.[0]);
        } else {
          setAgent({});
          dispatch({
            type: SHOW_SNACKBAR,
            payload: {
              type: "success",
              message:
                "We couldn't find any agent with this number. Please check the number and try again.",
              open: true,
            },
          });
        }
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isAgentInvolved && Object.keys(agent).length === 0) {
        dispatch({
          type: SHOW_SNACKBAR,
          payload: {
            type: "error",
            message:
              "Please search and select a valid agent before proceeding.",
            open: true,
          },
        });
        return;
      }
    // if (!verifyEmail?.verified && !verifyPhone?.verified) {
    //   setIsVerify(true);
    // } else {
    if (planCode) {
      const request = {
        planCode: planCode,
        userUid: agent?.uid ?? null,
        detail: { ...user, members: members },
        tenantId: tenantId,
        transactionId: applicationNumber,
      };
      switch (e.nativeEvent.submitter?.value) {
        case "send-payment-link":
          request.isSendPaymentLink = true;
          break;
        case "buy-now":
          request.isSendPaymentLink = false;
          break;
      }
      dispatch(
        planPurchaseRequest(request, token?.access_token, (order) => {
          setOrderDetail(order);
          if (request.isSendPaymentLink) {
            setShowPopUp(false);
            dispatch({
              type: SHOW_SNACKBAR,
              payload: {
                type: "success",
                message:
                  "Thank you. Payment link has been sent to the customer on his email and sms.",
                open: true,
              },
            });
            setTimeout(() => {
              closeBuyPlanPopup();
            }, 3200);
          } else {
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
                  closeBuyPlanPopup();
                  // User canceled the payment
                  console.log("Payment modal dismissed by the user.");
                },
              },
            };

            const rzp = new window.Razorpay(options);
            setShowPopUp(false);
            rzp.open();

            // Handle payment failures
            rzp.on("payment.failed", function (response) {
              console.log(`Payment failed: ${response.error.description}`);
              closeBuyPlanPopup();
            });
          }
        })
      );
    } else {
      dispatch({
        type: SHOW_SNACKBAR,
        payload: {
          type: "success",
          message: "Please select a plan.",
          open: true,
        },
      });
    }
  };
  const closeBuyPlanPopup = () => {
    window.parent.postMessage("closebuyplanpopup", "*");
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    if (agentPhone.length === 10) {
      const timer = setTimeout(() => {
        GetAgent();
      }, 600); 
      return () => clearTimeout(timer);
    } else {
      if (Object.keys(agent).length > 0) setAgent({});
    }
  }, [agentPhone]);

  return (
    <div>
      <BrokerPopup
        ModalHeader={
          <div className="text-black gap-4 font-medium box-border flex justify-between items-end broker max-md:flex-col max-md:items-start">
            <div>
              <h5>Enter details to buy plan</h5>
              {/* <div className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </div> */}
              <div className="text-[#696969] text-[14px]">
                <span className="font-[600] text-black">
                  Application Number:
                </span>
                {applicationNumber}
              </div>
            </div>
          </div>
        }
        isShowModal={showPopUp}
        setIsShowModal={(flag) => {
          closeBuyPlanPopup();
          setShowPopUp(flag);
        }}
        ModalBody={
          <div className="grid bg-white broker">
            <form onSubmit={onSubmit} className="memberForm">
              {/* Agent Toggle */}
              <div className="flex items-center gap-6 mb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="buyType"
                    value="self"
                    checked={!isAgentInvolved}
                    onChange={() => {
                      setIsAgentInvolved(false);
                      setAgent({});
                      setAgentPhone("");
                    }}
                    className="accent-[#123B7C] w-4 h-4"
                  />
                  <span className="text-[14px] text-gray-600 font-medium">
                    Self Buy
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="buyType"
                    value="agent"
                    checked={isAgentInvolved}
                    onChange={() => setIsAgentInvolved(true)}
                    className="accent-[#123B7C] w-4 h-4"
                  />
                  <span className="text-[14px] text-gray-600 font-medium">
                    Buy Through Agent
                  </span>
                </label>
              </div>

              {isAgentInvolved && (
                <div className="mb-3">
                  <div className="flex items-center gap-2">
                    <input
                      placeholder="Enter agent phone"
                      type="tel"
                      required={isAgentInvolved}
                      className="w-[250px] h-[38px] text-[15px] rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-[#123B7C] transition-all"
                      value={agentPhone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        if (value.length <= 10) setAgentPhone(value);
                      }}
                      maxLength={10}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                        e.target.value = e.target.value.slice(0, 10);
                      }}
                    />

                    {agentPhone.length === 10 &&
                      Object.keys(agent).length > 0 && (
                        <div className="transition-all duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            width="28"
                            height="28"
                            viewBox="0 0 256 256"
                          >
                            <g
                              style={{
                                stroke: "none",
                                strokeWidth: 0,
                                strokeDasharray: "none",
                                strokeLinecap: "butt",
                                strokeLinejoin: "miter",
                                strokeMiterlimit: 10,
                                fill: "none",
                                fillRule: "nonzero",
                                opacity: 1,
                              }}
                              transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                            >
                              <path
                                d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z"
                                style={{
                                  stroke: "none",
                                  strokeWidth: 1,
                                  strokeDasharray: "none",
                                  strokeLinecap: "butt",
                                  strokeLinejoin: "miter",
                                  strokeMiterlimit: 10,
                                  fill: "rgb(0,170,28)",
                                  fillRule: "nonzero",
                                  opacity: 1,
                                }}
                                transform="matrix(1 0 0 1 0 0)"
                                strokeLinecap="round"
                              />
                              <path
                                d="M 38.615 71.654 L 16.332 38.93 h 8.008 l 13.19 10.708 c 6.222 -10.351 20.164 -22.904 31.018 -28.718 h 6.077 C 60.582 31.819 46.34 53.763 38.615 71.654 z"
                                style={{
                                  stroke: "none",
                                  strokeWidth: 1,
                                  strokeDasharray: "none",
                                  strokeLinecap: "butt",
                                  strokeLinejoin: "miter",
                                  strokeMiterlimit: 10,
                                  fill: "rgb(255,255,255)",
                                  fillRule: "nonzero",
                                  opacity: 1,
                                }}
                                transform="matrix(1 0 0 1 0 0)"
                                strokeLinecap="round"
                              />
                            </g>
                          </svg>
                        </div>
                      )}
                  </div>

                  {Object.keys(agent).length > 0 && (
                    <div className="border-[1px] flex flex-col gap-1 border-gray-300 p-[4px] mt-2 rounded-lg">
                      <div className="mx-3 text-gray-700 font-medium   underline">
                        Agent Detail:
                      </div>
                      <div className=" flex gap-4 p-[4px] rounded-lg">
                        <div className="mx-3 text-gray-700">
                          Name:{" "}
                          <span className="text-gray-600">{agent?.name}</span>
                        </div>
                        <div className="mx-3 text-gray-700">
                          Phone:{" "}
                          <span className="text-gray-600">{agent?.phone}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="grid max-h-[320px] gap-2 overflow-y-auto light">
                {/* For Self */}
                <Accordion className="accordion-force-light border-[1px] dark:border-gray-300">
                  <Accordion.Panel>
                    <Accordion.Title className="py-2 px-4 customFontSize accordion-force-light border-[1px] dark:border-gray-300">
                      Self
                    </Accordion.Title>
                    <Accordion.Content className="p-4">
                      <div className="grid grid-cols-2 gap-4 setCustomInputHeight">
                        {showRC && (
                          <>
                          <div className={`flex flex-col`}>
                              <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                                <label>Vehicle Brand</label>
                              </div>
                              <div className="relative">
                                <input
                                  placeholder="Vehicle Brand *"
                                  type="text"
                                  required
                                  className="w-full pr-[55px]"
                                  value={user?.vehicleBrand}
                                  onChange={(e) => {
                                    setUser({
                                      ...user,
                                      vehicleBrand: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                            <div className={`flex flex-col`}>
                              <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                                <label>Vehicle Model</label>
                              </div>
                              <div className="relative">
                                <input
                                  placeholder="Vehicle Model *"
                                  type="text"
                                  required
                                  className="w-full pr-[55px]"
                                  value={user?.vehicleModel}
                                  onChange={(e) => {
                                    setUser({
                                      ...user,
                                      vehicleModel: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                            <div className={`flex flex-col`}>
                              <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                                <label>RC Number</label>
                              </div>
                              <div className="relative">
                                <input
                                  placeholder="RC Number *"
                                  type="text"
                                  required
                                  className="w-full pr-[55px]"
                                  value={user?.rcNumber}
                                  onChange={(e) => {
                                    setUser({
                                      ...user,
                                      rcNumber: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                            <div className={`flex flex-col`}>
                              <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                                <label>Engine Number</label>
                              </div>
                              <div className="relative">
                                <input
                                  placeholder="Engine Number *"
                                  type="text"
                                  required
                                  className="w-full pr-[55px]"
                                  value={user?.engineNumber}
                                  onChange={(e) => {
                                    setUser({
                                      ...user,
                                      engineNumber: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                            <div className={`flex flex-col`}>
                              <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                                <label>Chessis Number</label>
                              </div>
                              <div className="relative">
                                <input
                                  placeholder="Chessis Number *"
                                  type="text"
                                  required
                                  className="w-full pr-[55px]"
                                  value={user?.chassisNumber}
                                  onChange={(e) => {
                                    setUser({
                                      ...user,
                                      chassisNumber: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </>
                        )}
                        <div className={`flex flex-col col-span-1`}>
                          <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                            <label>Name</label>
                          </div>
                          <input
                            placeholder="Name *"
                            type="text"
                            required
                            className="outline-none"
                            onChange={(e) =>
                              setUser({ ...user, name: e.target.value })
                            }
                          />
                        </div>
                        <div className={`flex flex-col col-span-1`}>
                          <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                            <label>Father/Husband Name</label>
                          </div>
                          <input
                            placeholder="Father/Husband Name *"
                            type="text"
                            required
                            className="outline-none"
                            onChange={(e) =>
                              setUser({ ...user, guardianName: e.target.value })
                            }
                          />
                        </div>
                        <div className={`flex flex-col`}>
                          <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                            <label>Email</label>
                          </div>
                          <div className="relative">
                            <input
                              placeholder="Email *"
                              type="email"
                              required
                              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
                              className="w-full pr-[55px]"
                              disabled={verifyEmail?.verified}
                              onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <div className={`flex flex-col`}>
                          <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                            <label>Phone</label>
                          </div>
                          <div className="relative">
                            <input
                              placeholder="Phone *"
                              type="tel"
                              required
                              className="w-full pr-[55px]"
                              pattern="[0-9]{10}"
                              disabled={verifyPhone?.verified}
                              onChange={(e) => {
                                const value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                                if (value.length <= 10) {
                                  setUser({ ...user, phone: value });
                                }
                              }}
                              maxLength={10}
                              onInput={(e) => {
                                e.target.value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                                e.target.value = e.target.value.slice(0, 10);
                              }}
                            />
                          </div>
                        </div>
                        <div className={`flex flex-col`}>
                          <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                            <label>DOB</label>
                          </div>
                          <input
                            placeholder="DOB *"
                            type="date"
                            required
                            className="uppercase"
                            max={new Date().toISOString().split("T")[0]}
                            onChange={(e) =>
                              setUser({ ...user, dob: e.target.value })
                            }
                          />
                        </div>
                        <div className={`flex flex-col col-span-1`}>
                          <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                            <label>Gender</label>
                          </div>
                          <select
                            id="gender"
                            className="text-[14px] h-[42px] min-h-[42px] w-full justify-center p-[10px] font-[500] bg-[#f7f8fc] rounded-[8px] shadow-input outline-none border-none text-black tracking-[-0.02em] placeholder:text-[#CFD2DC] focus:bg-[#f7f8fc]"
                            value={user.gender}
                            name="gender"
                            onChange={(e) =>
                              setUser({ ...user, gender: e.target.value })
                            }
                          >
                            <option value="" disabled selected>
                              Select Gender
                            </option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                          </select>
                        </div>
                        <div className={`flex flex-col`}>
                          <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                            <label>Pan Card</label>
                          </div>
                          <div className="relative">
                            <input
                              placeholder="PanCard *"
                              type="text"
                              required
                              className="w-full pr-[55px]"
                              value={user?.panCard}
                              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                              onChange={(e) => {
                                const value = e.target.value
                                  .toUpperCase()
                                  .replace(/[^A-Z0-9]/g, "");
                                if (value.length <= 10) {
                                  setUser({ ...user, panCard: value });
                                }
                              }}
                              maxLength={10}
                              onInput={(e) => {
                                e.target.value = e.target.value
                                  .toUpperCase()
                                  .replace(/[^A-Z0-9]/g, "");
                                e.target.value = e.target.value.slice(0, 10);
                              }}
                            />
                          </div>
                        </div>
                        <div className={`flex flex-col col-span-1`}>
                          <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                            <label>Address</label>
                          </div>
                          <input
                            placeholder="Address *"
                            type="text"
                            required
                            className="outline-none"
                            onChange={(e) =>
                              setUser({
                                ...user,
                                address: {
                                  ...user.address,
                                  addressLine: e.target.value, // Updating only addressLine
                                },
                              })
                            }
                          />
                        </div>
                        <div className={`flex flex-col col-span-1`}>
                          <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                            <label>State</label>
                          </div>
                          <input
                            placeholder="State *"
                            type="text"
                            required
                            className="outline-none"
                            onChange={(e) =>
                              setUser({
                                ...user,
                                address: {
                                  ...user.address,
                                  state: e.target.value, // Updating only addressLine
                                },
                              })
                            }
                          />
                        </div>
                        <div className="col-span-1 flex flex-col">
                          <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                            City
                          </div>
                          <Autocomplete
                            size="small"
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                onInput={(e) => getCityQuery(e.target.value)}
                                placeholder="Search..." required
                              />
                            )}
                            options={allCity}
                            onChange={(e, newValue) => {
                              if (newValue) {
                                setUser({
                                  ...user,
                                  address: {
                                    ...user.address,
                                    cityCode: newValue?.value,
                                    city: newValue?.label,
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
                            type="text"
                            required
                            className="outline-none"
                            onChange={(e) =>
                              setUser({
                                ...user,
                                address: {
                                  ...user.address,
                                  pincode: e.target.value, // Updating only addressLine
                                },
                              })
                            }
                          />
                        </div>
                        {isRider && (
                          <>
                            <div className={`flex flex-col col-span-1`}>
                              <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                                <label>Nominee Name</label>
                              </div>
                              <input
                                placeholder="Nominee Name *"
                                type="text"
                                required
                                className="outline-none"
                                onChange={(e) =>
                                  setUser({
                                    ...user,
                                    nominee: {
                                      ...user.nominee,
                                      name: e.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                            <div className={`flex flex-col col-span-1`}>
                              <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                                <label>Relation</label>
                              </div>
                              <input
                                placeholder="Relation *"
                                type="text"
                                required
                                className="outline-none"
                                onChange={(e) =>
                                  setUser({
                                    ...user,
                                    nominee: {
                                      ...user.nominee,
                                      relation: e.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                            <div className={`flex flex-col col-span-1`}>
                              <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                                <label>Nominee DOB</label>
                              </div>
                              <input
                                placeholder="Nominee DOB *"
                                type="date"
                                required
                                className="uppercase"
                                max={new Date().toISOString().split("T")[0]}
                                onChange={(e) =>
                                  setUser({
                                    ...user,
                                    nominee: {
                                      ...user.nominee,
                                      dob: e.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                </Accordion>
                {!showMember &&
                  members?.map((m, i) => (
                    <Accordion
                      key={i}
                      className="accordion-force-light border-[1px] dark:border-gray-300"
                    >
                      <Accordion.Panel>
                        <Accordion.Title className="py-2 px-4 customFontSize accordion-force-light border-[1px] dark:border-gray-300">
                          Member {i + 1}
                        </Accordion.Title>
                        <Accordion.Content className="p-4">
                          <div className="grid grid-cols-2 gap-4 setCustomInputHeight">
                            <div className={`flex flex-col col-span-1`}>
                              <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                                <label>Name</label>
                              </div>
                              <input
                                placeholder="Name *"
                                type="text"
                                className=""
                                onChange={(e) => {
                                  members[i].name = e.target.value;
                                  setMembers([...members]);
                                }}
                              />
                            </div>
                            <div className={`flex flex-col`}>
                              <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                                <label>Email</label>
                              </div>
                              <input
                                placeholder="Email *"
                                type="email"
                                className=""
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
                                onChange={(e) => {
                                  members[i].email = e.target.value;
                                  setMembers([...members]);
                                }}
                              />
                              {!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(
                                members[i].email
                              ) && (
                                  <p className="text-red-500 text-sm">
                                    Enter a valid email address.
                                  </p>
                                )}
                            </div>
                            <div className={`flex flex-col`}>
                              <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                                <label>Phone</label>
                              </div>
                              <input
                                placeholder="Phone *"
                                type="tel"
                                className=""
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                  );
                                  if (value.length <= 10) {
                                    members[i].phone = value;
                                    setMembers([...members]);
                                  }
                                }}
                                maxLength={10}
                                onInput={(e) => {
                                  e.target.value = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                  );
                                  e.target.value = e.target.value.slice(0, 10);
                                }}
                              />
                              {!/^\d{10}$/.test(members[i].phone) && (
                                <p className="text-red-500 text-sm">
                                  Phone number must be 10 digits.
                                </p>
                              )}
                            </div>
                            <div className={`flex flex-col`}>
                              <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                                <label>DOB</label>
                              </div>
                              <input
                                placeholder="DOB *"
                                type="date"
                                className="uppercase"
                                max={new Date().toISOString().split("T")[0]}
                                onChange={(e) => {
                                  members[i].dob = e.target.value;
                                  setMembers([...members]);
                                }}
                              />
                            </div>
                            <div className={`flex flex-col col-span-1`}>
                              <div className="text-[#656F7D] text-[14px] font-normal mb-1">
                                <label>Gender</label>
                              </div>
                              <select
                                id="gender"
                                className="text-[14px] h-[42px] min-h-[42px] w-full justify-center p-[10px] font-[500] bg-[#f7f8fc] rounded-[8px] shadow-input outline-none border-none text-black tracking-[-0.02em] placeholder:text-[#CFD2DC] focus:bg-[#f7f8fc]"
                                value={m.gender}
                                name="gender"
                                onChange={(e) => {
                                  members[i].gender = e.target.value;
                                  setMembers([...members]);
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
                                value={m.relation}
                                className="text-[14px] h-[42px] min-h-[42px] w-full justify-center p-[10px] font-[500] bg-[#f7f8fc] rounded-[8px] shadow-input outline-none border-none text-black tracking-[-0.02em] placeholder:text-[#CFD2DC] focus:bg-[#f7f8fc]"
                                name="gender"
                                onChange={(e) => {
                                  members[i].relation = e.target.value;
                                  setMembers([...members]);
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
                        </Accordion.Content>
                      </Accordion.Panel>
                    </Accordion>
                  ))}
              </div>
              <div
                className={`grid-button flex-col flex gap25 justify-between items-start pt-[10px]`}
              >
                <div className={`flex flex-col checkmark_v1`}>
                  <label className="flex gap-[4px] items-start cursor-pointer">
                    <input
                      type="checkbox"
                      className="translate-y-[9px]"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <div className="w-full mt-[6px] mb-[10px] text-[12px]">
                      I hereby declare that all proposed members are in good
                      health and entirely free from any mental or physical
                      impairments or deformities, disease/condition. Neither any
                      of the proposed members have been hospitalized for
                      treatment of an illness or injury in past nor consulted
                      any physician or conducted investigation for reasons other
                      than common cough, cold or flu. None of the proposed
                      member are habitual consumer of alcohol, tobacco, gutka or
                      any recreational drugs.
                    </div>
                  </label>
                </div>
                <div className="flex max-[470px]:flex-col max-[470px]:items-start gap-4 justify-between w-full items-center">
                  <button
                    type="submit"
                    disabled={!isChecked}
                    value={"send-payment-link"}
                    className={`font-semibold py-3 px-6 rounded-xl transition-all duration-200 ${isChecked
                        ? "text-[#123B7C] bg-white border-2 border-[#123B7C] hover:bg-[#EEF3FB]"
                        : "text-[#9aa2b1] bg-[#f0f1f3] border-2 border-[#e2e6ee] cursor-not-allowed"
                      }`}
                  >
                    <span>Send Payment Link</span>
                    <i className="fa fa-arrow-right pl-3"></i>
                  </button>

                  <button
                    type="submit"
                    disabled={!isChecked}
                    value={"buy-now"}
                    className={`buytext-linear max-[470px]:mb-4 font-semibold py-3 px-6 rounded-xl transition-all duration-200 ${isChecked
                        ? "text-white bg-[#123B7C] hover:bg-[#0D2E63] shadow-[0_8px_20px_rgba(18,59,124,0.18)] hover:-translate-y-0.5"
                        : "text-[#9aa2b1] bg-[#cdcdcd] cursor-not-allowed"
                      }`}
                  >
                    <span>Buy Now</span>
                    <i className="fa fa-arrow-right px-3"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        }
        size="2xl"
      />
      <BrokerPopup
        ModalHeader={<></>}
        isShowModal={showCongratulations}
        setIsShowModal={(flag) => {
          closeBuyPlanPopup();
          setShowCongratulations(flag);
        }}
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
              to us at
              <strong> {orderDetail?.contactEmail} </strong>
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

      <BrokerPopup
        ModalHeader={<></>}
        isShowModal={showFailed}
        setIsShowModal={(flag) => {
          closeBuyPlanPopup();
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
              to us at <br />
              <a href="mailto:contact@zealthix.com" className="font-semibold">
                {orderDetail?.contactEmail}
              </a>
            </p>
          </div>
        }
        size="lg"
      />
      <PopUp
        size="md"
        isShowModal={openVerify}
        setIsShowModal={setOpenVerify}
        ModalContent={
          <OtpInput
            verifyEmail={verifyEmail}
            verifyPhone={verifyPhone}
            setVerifyEmail={setVerifyEmail}
            setVerifyPhone={setVerifyPhone}
            setOpenVerify={setOpenVerify}
            token={token}
          />
        }
      />
      <PopUp
        size="sm"
        isShowModal={isVerify}
        setIsShowModal={setIsVerify}
        ModalContent={
          <>
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="bg-white p-6 rounded-md shadow-lg text-center">
                <p className="text-lg font-semibold text-red-600 mb-4">
                  Email and/or Mobile are not verified!
                </p>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md linear-block focus:outline-none"
                  onClick={() => setIsVerify(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}

export default BuyPlan;
