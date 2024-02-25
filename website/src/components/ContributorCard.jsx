const ContributorCard = ({username,avatarUrl,profileUrl}) => {
  return (
            <a href={profileUrl}>
                <img src={avatarUrl} alt={username} />
            </a>

  )
}

export default ContributorCard
