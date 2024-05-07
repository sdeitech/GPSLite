import React, {useState, useEffect, useRef} from 'react';
import WorkflowCommon from '@components/common/WorkflowCommon';
import {useDispatch, useSelector} from 'react-redux';
import {
  completeJob,
  completeSubJob,
  getRiskInJob,
  getWorkFlowAttachments,
  getWorkFlowData,
  jobDetail,
  riskJobData,
  saveWorkFlowData,
  subJobInformation,
} from 'src/redux/slice/jobSlice';
import {setStepValue} from 'src/redux/commonStateSlice/commonStateSlice';

const JobWorkFlow = ({navigation, route}) => {
  const [reply, setReply] = useState('');
  const [isVisible, setIsvisible] = useState(false);
  const [stepNumber, setStepNumber] = useState(1);
  const stepNumberRef = useRef(1);
  const {workflowId, jobID, subJobId, isSubJobStarted, didJobStarted} =
    route.params;
  const {workflowDetail, workflowAttachments} = useSelector(
    state => state.jobs,
  );
  const jobRiskData = useSelector(riskJobData);
  const {user} = useSelector(state => state.auth);
  let numberOfSteps = workflowDetail[0]?.stepDetails.length;
  const jobData = useSelector(jobDetail);
  const JobId = jobData?.jobId;
  const subJobInfo = useSelector(subJobInformation);

  const dispatch = useDispatch();

  useEffect(() => {
    getWorkflowData()
      .then(r => {
        getRiskOfJob();
      })
      .catch(err => console.log('err', err));
  }, []);

  const goBack = () => {
    navigation.popToTop();
  };
  const noWorkFlowSteps = () => {
    const completeJobBody = {
      jobId: jobData?.jobId,
      jobStatusId: 8,
      statusName: jobData?.status,
      userEmailId: user?.userDetails?.emailId,
    };

    dispatch(completeJob(completeJobBody)).then(r =>
      navigation.navigate('CustomerSatisfaction', {
        workflowId,
      }),
    );
  };
  const onCompletingSteps = stepsData => {
    if (stepNumber === numberOfSteps) {
      const stepDetail = stepsData.map(item => {
        return {
          stepDetailId: item.stepDetailId,
          workflowFieldsJobDtos: item.workflowFields.map(val => ({
            workflowFieldId: val.workflowFieldId,
            value: val.value,
          })),
        };
      });

      const data = {
        userId: user?.userId,
        jobId: JobId,
        subJobId: isSubJobStarted ? subJobId : 0,
        workflowId: workflowId,
        stepTestDetailsDtos: stepDetail,
      };
      const completeJobBody = {
        jobId: jobData?.jobId,
        jobStatusId: 8,
        statusName: jobData?.status,
        userEmailId: user?.userDetails?.emailId,
      };
      const completeSubJobbody = {
        jobId: jobID,
        jobStatusId: jobData?.statusId,
        statusName: subJobInfo?.status,
        userEmailId: user?.userDetails?.emailId,
        subJobId: subJobId,
      };
      console.log('completeSubJobbody=====>>>>>>>', completeSubJobbody);
      dispatch(saveWorkFlowData(data)).then(r =>
        isSubJobStarted
          ? dispatch(completeSubJob(completeSubJobbody)).then(r =>
              navigation.navigate('CustomerSatisfaction', {
                workflowId,
                subJobId,
              }),
            )
          : dispatch(completeJob(completeJobBody)).then(r =>
              navigation.navigate('CustomerSatisfaction', {
                workflowId,
              }),
            ),
      );
      return;
    }
    setStepNumber(stepNumber + 1);
    stepNumberRef.current = stepNumberRef.current + 1;
    dispatch(setStepValue(stepNumberRef.current));
  };

  const getWorkflowData = async () => {
    await dispatch(getWorkFlowData(workflowId, jobID, subJobId));
    getworkFlowAttachments();
  };
  const getworkFlowAttachments = () => {
    const workFlowAttachmentBody = {
      pageNumber: 0,
      pageSize: 10,
      pageIndex: 0,
      activityId: workflowId,
      stepDetailId: workflowDetail[0]?.stepDetails[0]?.stepDetailId,
    };

    dispatch(getWorkFlowAttachments(workFlowAttachmentBody));
  };

  const getRiskOfJob = () => {
    const riskBody = {
      jobId: jobID,
      subJobId: isSubJobStarted ? subJobId : 0,
    };
    dispatch(getRiskInJob(riskBody));
  };

  return (
    <WorkflowCommon
      onCompletingSteps={onCompletingSteps}
      goBack={goBack}
      isVisible={isVisible}
      setIsvisible={setIsvisible}
      setReply={setReply}
      reply={reply}
      numberOfSteps={numberOfSteps}
      stepNumber={stepNumber}
      stepData={workflowDetail.length > 0 && workflowDetail[0]?.stepDetails}
      filePath={workflowAttachments.length > 0 && workflowAttachments}
      setStepNumber={setStepNumber}
      stepNumberRef={stepNumberRef.current}
      noWorkFlowSteps={noWorkFlowSteps}
      workflowAttachments={workflowAttachments}
      setIsVisible={setIsvisible}
      riskInJob={jobRiskData}
      jobId={jobID}
      subJobId={subJobId}
    />
  );
};

export default JobWorkFlow;
