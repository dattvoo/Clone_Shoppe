import {
  FloatingArrow,
  FloatingPortal,
  type Placement,
  arrow,
  autoPlacement,
  flip,
  offset,
  safePolygon,
  shift,
  useFloating,
  useHover,
  useInteractions,
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { ElementType, useRef, useState } from 'react'

interface IProps {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  placement?: Placement[]
}

export default function Popover({ children, className, renderPopover, as: Element = 'div', placement = ['bottom'] }: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift(), arrow({ element: arrowRef }), autoPlacement({
      allowedPlacements: placement
    })]
  })

  // const role = useRole(context)
  const hover = useHover(context, {
    move: true,
    handleClose: safePolygon({
      requireIntent: false
    })
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  return (
    <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className='bg-white text-black relative shadow-md rounded-sm border border-gray-200'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {renderPopover}
              <FloatingArrow ref={arrowRef} context={context} fill='white' width={20} height={15} />

            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
