const hyphenToSpace = ({ inputString }: { inputString: string }) => {
  return inputString.replace(/-/g, " ")
}

export default hyphenToSpace
