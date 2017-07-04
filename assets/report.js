var report = new Vue({
  el: '#report',
  data: {
    step: 1,
    ready: false,
    report: {
      subject: null,
      about: {
        lead: null,
        date: null,
        components: null,
        purpose: {
          functional: false,
          balance: false,
          control: false
        }
      },
      player: [
        {
          name: null,
          list: null,
          type: null,
          notes: null
        },
        {
          name: null,
          list: null,
          type: null,
          notes: null
        }
      ],
      results: {
        winner: null,
        points: [null, null],
        rounds: null,
        time: null,
        summary: null
      },
      feedback: {
        functionality: null,
        balance: null,
        other: null
      }
    }
  },
  methods: {
    dateme: function () {
      var c = new Date()
      var d = (c.getDate()).toString()
      var m = (c.getMonth() + 1).toString()
      var y = (c.getFullYear()).toString()
      d = (d.length === 1) ? '0' + d : d
      m = (m.length === 1) ? '0' + m : m
      return [y, m, d].join('/')
    }
  },
  created: function () {
    
    this.ready = true
    this.report.about.date = this.dateme()
    
    var clipboard = new Clipboard('.copy')
    
    clipboard.on('success', function (event) {
      alert('Copied')
      event.clearSelection()
    })
    
  }
})
