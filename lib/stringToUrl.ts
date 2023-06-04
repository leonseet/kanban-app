const stringToUrl = ({ inputString }: { inputString: string }) => {
  return encodeURIComponent(inputString.trim().replace(/\s+/g, "-"))
}

export default stringToUrl
