import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import NodeRule from './NodeRule'
import WorkloadRule from './WorkloadRule'

const TemplateRule = (props, ref) => {
  const { namespace } = props

  const ruleRef = useRef()
  const workloadRef = useRef()
  useImperativeHandle(ref, () => ({
    target: namespace ? workloadRef.current.target : ruleRef.current.target,
  }))

  return namespace ? (
    <WorkloadRule ref={workloadRef} {...props}></WorkloadRule>
  ) : (
    <NodeRule ref={ruleRef} {...props} />
  )
}

const TemplateRuleWithRef = forwardRef(TemplateRule)

export default TemplateRuleWithRef
