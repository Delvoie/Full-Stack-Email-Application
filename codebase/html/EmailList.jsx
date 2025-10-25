export default function EmailList({ emails, setSelectedEmail }) {
    return (
        <ul>
          {emails.map(email => (
            <li className="border-b p-4 hover:bg-gray-100 cursor-pointer" key={email.id} onClick={() => setSelectedEmail(email)}>
              <p className="text-sm">{email.subject}</p>
            </li>
          ))}
        </ul>

    )
}