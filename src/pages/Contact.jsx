function Contact(){
    return(
        <>
          <section className="p-8 text-center">
      <h2 className="text-4xl font-bold text-[#b05e5e]">Contact Us</h2>
      <p className="mt-4 text-gray-600">We’d love to hear from you! Fill out the form below:</p>

      <form className="max-w-md mx-auto mt-8 space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border rounded px-4 py-2"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border rounded px-4 py-2"
        />
        <textarea
          placeholder="Your Message"
          className="w-full border rounded px-4 py-2 h-32"
        />
        <button className="bg-[#b05e5e] text-white px-6 py-2 rounded hover:bg-[#C97C7C] hover:text-black">
          Send Message
        </button>
      </form>
    </section>
        </>
    )
}
export default Contact


