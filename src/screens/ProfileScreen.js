import React, { useState, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as DocumentPicker from "expo-document-picker";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const COLORS = {
  blue: "#2563EB",
  blueLight: "#EFF6FF",
  green: "#16A34A",
  greenLight: "#F0FDF4",
  bg: "#F1F5F9",
  card: "#FFFFFF",
  border: "#E2E8F0",
  text: "#1E293B",
  sub: "#64748B",
  red: "#EF4444",
  redLight: "#FEF2F2",
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const YEARS = Array.from({ length: 30 }, (_, i) => String(new Date().getFullYear() - i));

const EDU_LEVELS = [
  "Class X", "Class XII", "Diploma", "B.Tech/B.E.", "BCA", "B.Sc",
  "B.Com", "BBA", "BA", "M.Tech/M.E.", "MCA", "MBA", "M.Sc", "PhD",
];

const EDU_COURSES = [
  "Computer Science", "Information Technology", "Electronics",
  "Mechanical", "Civil", "Commerce", "Science", "Arts", "Management",
];

const EDU_SPECS = [
  "AI & Machine Learning", "Data Science", "Web Development",
  "Cyber Security", "Finance", "Marketing", "HR",
];

const GRADING_SYSTEMS = [
  "Percentage", "CGPA out of 10", "CGPA out of 7", "CGPA out of 4",
];

// ─────────────────────────────────────────────
// SMALL REUSABLE COMPONENTS
// ─────────────────────────────────────────────

function FormInput({ label, required, placeholder, value, onChangeText, keyboardType, multiline, numberOfLines }) {
  return (
    <View style={styles.formGroup}>
      {label ? (
        <Text style={styles.formLabel}>
          {label}{required ? <Text style={{ color: COLORS.red }}> *</Text> : null}
        </Text>
      ) : null}
      <TextInput
        style={[styles.formInput, multiline && { height: numberOfLines * 22, textAlignVertical: "top" }]}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType || "default"}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );
}

function RadioGroup({ label, options, value, onChange }) {
  return (
    <View style={styles.formGroup}>
      {label ? <Text style={styles.formLabel}>{label}</Text> : null}
      <View style={styles.radioRow}>
        {options.map((opt) => (
          <TouchableOpacity key={opt} style={styles.radioOpt} onPress={() => onChange(opt)}>
            <View style={[styles.radioCircle, value === opt && styles.radioCircleActive]}>
              {value === opt && <View style={styles.radioDot} />}
            </View>
            <Text style={styles.radioLabel}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function SimpleSelect({ label, required, options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.formGroup}>
      {label ? (
        <Text style={styles.formLabel}>
          {label}{required ? <Text style={{ color: COLORS.red }}> *</Text> : null}
        </Text>
      ) : null}
      <TouchableOpacity style={styles.selectBox} onPress={() => setOpen(true)}>
        <Text style={value ? styles.selectValue : styles.selectPlaceholder}>
          {value || placeholder || "Select"}
        </Text>
        <MaterialIcons name="keyboard-arrow-down" size={20} color={COLORS.sub} />
      </TouchableOpacity>
      <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.selectOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.selectDropdown}>
                <Text style={styles.dropdownTitle}>{label || placeholder || "Select"}</Text>
                <ScrollView style={{ maxHeight: 300 }}>
                  {options.map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      style={[styles.dropdownItem, value === opt && styles.dropdownItemActive]}
                      onPress={() => { onChange(opt); setOpen(false); }}
                    >
                      <Text style={[styles.dropdownItemText, value === opt && { color: COLORS.blue, fontWeight: "700" }]}>
                        {opt}
                      </Text>
                      {value === opt && <MaterialIcons name="check" size={16} color={COLORS.blue} />}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

function ModalWrapper({ visible, onClose, title, children }) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalBox}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{title}</Text>
                  <TouchableOpacity style={styles.modalClose} onPress={onClose}>
                    <MaterialIcons name="close" size={20} color={COLORS.text} />
                  </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                  {children}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function ModalFooter({ onCancel, onSave }) {
  return (
    <View style={styles.modalFooter}>
      <TouchableOpacity style={styles.btnCancel} onPress={onCancel}>
        <Text style={styles.btnCancelText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnSave} onPress={onSave}>
        <Text style={styles.btnSaveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─────────────────────────────────────────────
// ABOUT MODAL
// ─────────────────────────────────────────────
function AboutModal({ visible, initial, onClose, onSave }) {
  const [text, setText] = useState(initial);
  React.useEffect(() => { if (visible) setText(initial); }, [visible]);
  return (
    <ModalWrapper visible={visible} onClose={onClose} title="About Me">
      <FormInput
        label="Tell us about yourself"
        placeholder="Write a short bio about your experience, goals, and expertise..."
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={5}
      />
      <ModalFooter onCancel={onClose} onSave={() => { onSave(text); onClose(); }} />
    </ModalWrapper>
  );
}
function SkillsModal({ visible, initial, onClose, onSave }) {
  const [input, setInput] = useState("");
  const [localSkills, setLocalSkills] = useState(initial || []);

  React.useEffect(() => {
    if (visible) {
      setLocalSkills(initial || []);
      setInput("");
    }
  }, [visible]);

  const add = () => {
    const v = input.trim();
    if (!v) return;

    if (localSkills.includes(v)) {
      Alert.alert("Duplicate", "Skill already added.");
      return;
    }

    setLocalSkills(prev => [...prev, v]);
    setInput("");
  };

  const remove = (i) => {
    setLocalSkills(prev => prev.filter((_, idx) => idx !== i));
  };

  return (
    <ModalWrapper visible={visible} onClose={onClose} title="Key Skills">
      <View style={{ marginBottom: 12 }}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.skillInput}
            placeholder="e.g. React, Python..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.addBtn} onPress={add}>
            <Text style={styles.addBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.skillsWrap}>
          {localSkills.map((s, i) => (
            <View key={i} style={styles.skillTag}>
              <Text style={styles.skillTagText}>{s}</Text>
              <TouchableOpacity onPress={() => remove(i)}>
                <MaterialIcons name="close" size={14} color={COLORS.blue} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <ModalFooter
        onCancel={onClose}
        onSave={() => {
          onSave(localSkills);
          onClose();
        }}
      />
    </ModalWrapper>
  );
}

// ─────────────────────────────────────────────
// EMPLOYMENT MODAL
// ─────────────────────────────────────────────
const defaultEmp = {
  isCurrent: "Yes",
  empType: "Full-time",
  expYears: "0",
  expMonths: "0",
  company: "",
  title: "",
  joinYear: "",
  joinMonth: "",
  salary: "",
  profile: "",
};

function EmploymentModal({ visible, onClose, onSave }) {
  const [form, setForm] = useState(defaultEmp);
  React.useEffect(() => { if (visible) setForm(defaultEmp); }, [visible]);
  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    if (!form.company.trim() || !form.title.trim() || !form.salary.trim()) {
      Alert.alert("Required Fields", "Please fill company name, job title and salary.");
      return;
    }
    onSave(form);
    onClose();
  };

  return (
    <ModalWrapper visible={visible} onClose={onClose} title="Employment">
      <RadioGroup label="Is this your current employment?" options={["Yes", "No"]} value={form.isCurrent} onChange={set("isCurrent")} />
      <RadioGroup label="Employment type" options={["Full-time", "Internship", "Part-time"]} value={form.empType} onChange={set("empType")} />

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Total Experience</Text>
        <View style={styles.rowHalf}>
          <SimpleSelect
            options={Array.from({ length: 11 }, (_, i) => `${i} ${i === 1 ? "Year" : "Years"}`)}
            value={form.expYears ? `${form.expYears} ${form.expYears === "1" ? "Year" : "Years"}` : ""}
            onChange={(v) => set("expYears")(v.split(" ")[0])}
            placeholder="0 Years"
          />
          <SimpleSelect
            options={Array.from({ length: 12 }, (_, i) => `${i} ${i === 1 ? "Month" : "Months"}`)}
            value={form.expMonths ? `${form.expMonths} ${form.expMonths === "1" ? "Month" : "Months"}` : ""}
            onChange={(v) => set("expMonths")(v.split(" ")[0])}
            placeholder="0 Months"
          />
        </View>
      </View>

      <FormInput label="Current company name" required placeholder="Type your organization" value={form.company} onChangeText={set("company")} />
      <FormInput label="Current job title" required placeholder="Type your designation" value={form.title} onChangeText={set("title")} />

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Joining date</Text>
        <View style={styles.rowHalf}>
          <SimpleSelect options={YEARS} value={form.joinYear} onChange={set("joinYear")} placeholder="Select Year" />
          <SimpleSelect options={MONTHS} value={form.joinMonth} onChange={set("joinMonth")} placeholder="Select Month" />
        </View>
      </View>

      <FormInput label="Current salary" required placeholder="e.g. 1200000" value={form.salary} onChangeText={set("salary")} keyboardType="numeric" />
      <FormInput label="Job profile / Description" placeholder="Brief description of your role..." value={form.profile} onChangeText={set("profile")} multiline numberOfLines={4} />
      <ModalFooter onCancel={onClose} onSave={handleSave} />
    </ModalWrapper>
  );
}

// ─────────────────────────────────────────────
// EDUCATION MODAL
// ─────────────────────────────────────────────
const defaultEdu = {
  level: "", course: "", spec: "", institute: "",
  courseType: "Full time", startYear: "", endYear: "",
  grading: "", gradeValue: "",
};

function EducationModal({ visible, onClose, onSave }) {
  const [form, setForm] = useState(defaultEdu);
  React.useEffect(() => { if (visible) setForm(defaultEdu); }, [visible]);
  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    if (!form.level || !form.course || !form.institute.trim() || !form.grading) {
      Alert.alert("Required Fields", "Please fill all required fields.");
      return;
    }
    onSave(form);
    onClose();
  };

  return (
    <ModalWrapper visible={visible} onClose={onClose} title="Add Education">
      <SimpleSelect label="Education" required options={EDU_LEVELS} value={form.level} onChange={set("level")} />
      <SimpleSelect label="Course" required options={EDU_COURSES} value={form.course} onChange={set("course")} />
      <SimpleSelect label="Specialization" options={EDU_SPECS} value={form.spec} onChange={set("spec")} />
      <FormInput label="University / Institute" required placeholder="Enter institute name" value={form.institute} onChangeText={set("institute")} />
      <RadioGroup label="Course type" required options={["Full time", "Part time", "Distance"]} value={form.courseType} onChange={set("courseType")} />

      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Duration</Text>
        <View style={styles.rowHalf}>
          <SimpleSelect options={YEARS} value={form.startYear} onChange={set("startYear")} placeholder="Select Start Year" />
          <SimpleSelect options={YEARS} value={form.endYear} onChange={set("endYear")} placeholder="Select End Year" />
        </View>
      </View>

      <SimpleSelect label="Grading system" required options={GRADING_SYSTEMS} value={form.grading} onChange={set("grading")} placeholder="Select grading system" />
      {form.grading ? (
        <FormInput
          label={form.grading === "Percentage" ? "Enter percentage" : "Enter CGPA"}
          placeholder={form.grading === "Percentage" ? "e.g. 85" : "e.g. 8.5"}
          value={form.gradeValue}
          onChangeText={set("gradeValue")}
          keyboardType="numeric"
        />
      ) : null}
      <ModalFooter onCancel={onClose} onSave={handleSave} />
    </ModalWrapper>
  );
}

// ─────────────────────────────────────────────
// CERTIFICATION MODAL
// ─────────────────────────────────────────────
const defaultCert = { name: "", org: "", year: "", month: "", credId: "" };

function CertModal({ visible, onClose, onSave }) {
  const [form, setForm] = useState(defaultCert);
  React.useEffect(() => { if (visible) setForm(defaultCert); }, [visible]);
  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    if (!form.name.trim()) { Alert.alert("Required", "Please enter certification name."); return; }
    onSave(form);
    onClose();
  };

  return (
    <ModalWrapper visible={visible} onClose={onClose} title="Add Certification">
      <FormInput label="Certification Name" required placeholder="e.g. AWS Certified Developer" value={form.name} onChangeText={set("name")} />
      <FormInput label="Issuing Organization" placeholder="e.g. Amazon Web Services" value={form.org} onChangeText={set("org")} />
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Issue Date</Text>
        <View style={styles.rowHalf}>
          <SimpleSelect options={YEARS} value={form.year} onChange={set("year")} placeholder="Select Year" />
          <SimpleSelect options={MONTHS} value={form.month} onChange={set("month")} placeholder="Select Month" />
        </View>
      </View>
      <FormInput label="Credential ID" placeholder="Optional credential ID" value={form.credId} onChangeText={set("credId")} />
      <ModalFooter onCancel={onClose} onSave={handleSave} />
    </ModalWrapper>
  );
}

// ─────────────────────────────────────────────
// PROGRESS PILL
// ─────────────────────────────────────────────
function SectionPill({ label, pct }) {
  const done = pct === 100;
  return (
    <View style={[styles.pill, done && styles.pillDone]}>
      <Text style={styles.pillLabel}>{label}</Text>
      <Text style={[styles.pillPct, { color: done ? COLORS.green : COLORS.sub }]}>{pct}%</Text>
      <View style={styles.pillBar}>
        <View style={[styles.pillFill, { width: `${pct}%` }]} />
      </View>
    </View>
  );
}

  

    
  
// ─────────────────────────────────────────────
// MAIN PROFILE SCREEN
// ─────────────────────────────────────────────
export function ProfileScreen() {
  // State
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [skillsEditing, setSkillsEditing] = useState(false);
  const [employment, setEmployment] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [resumeName, setResumeName] = useState(null);
  const [showSkillsModal, setShowSkillsModal] = useState(false);

  // Modal visibility
  const [showAbout, setShowAbout] = useState(false);
  const [showEmployment, setShowEmployment] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showCert, setShowCert] = useState(false);

  // ── Completion Calc ──
  const sections = [
    { label: "About", pct: about ? 100 : 0 },
    { label: "Key Skills", pct: Math.min(skills.length * 20, 100) },
    { label: "Employment", pct: employment.length > 0 ? 100 : 0 },
    { label: "Education", pct: education.length > 0 ? 100 : 0 },
    { label: "Certifications", pct: certifications.length > 0 ? 100 : 0 },
    
    { label: "Resume", pct: resumeName ? 100 : 0 },
  ];
  const totalPct = Math.round(
  sections.reduce((acc, s) => acc + s.pct, 0) / sections.length
);

  // ── Skills Handlers ──
  const addSkill = () => {
  const v = skillInput.trim();

  if (!v) return;

  if (skills.includes(v)) {
    Alert.alert("Duplicate", "Skill already added.");
    return;
  }

  setSkills(prev => [...prev, v]);
  setSkillInput("");

  // ✅ ADD THIS LINE
  setSkillsEditing(true);
};
  const removeSkill = (i) => setSkills(prev => prev.filter((_, idx) => idx !== i));

  // ── Employment Handlers ──
  const removeEmployment = (i) =>
  setEmployment(prev => prev.filter((_, idx) => idx !== i));

const removeEducation = (i) =>
  setEducation(prev => prev.filter((_, idx) => idx !== i));

const removeCert = (i) =>
  setCertifications(prev => prev.filter((_, idx) => idx !== i));
const saveEmployment = (data) => {
  setEmployment(prev => [...prev, data]);
};

const saveEducation = (data) => {
  setEducation(prev => [...prev, data]);
};

const saveCert = (data) => {
  setCertifications(prev => [...prev, data]);
};

  const pickResume = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        copyToCacheDirectory: true,
        multiple: false,
      });

      // SDKs differ slightly in return shape; support both.
      if (res?.canceled) return;
      if (res?.type === "cancel") return;

      const picked =
        Array.isArray(res?.assets) && res.assets.length > 0 ? res.assets[0] : res;

      const name = picked?.name || (picked?.uri ? picked.uri.split("/").pop() : null);
      if (name) setResumeName(name);
    } catch (e) {
      Alert.alert("Upload failed", "Could not open file picker. Please try again.");
    }
  };

  return (
    <ScrollView
  style={styles.container}
  contentContainerStyle={{ paddingBottom: 100 }}
  showsVerticalScrollIndicator={false}
>
      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>MK</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>m kalpana</Text>
          <Text style={styles.sub}>Profile last updated - Today</Text>
          <View style={styles.infoRow}>
            <MaterialIcons name="email" size={14} color={COLORS.sub} />
            <Text style={styles.infoText}>maramkalpana@gmail.com</Text>
          </View>
        </View>
        <View style={styles.progressCircle}>
          <Text style={styles.percent}>{totalPct}%</Text>
        </View>
      </View>

      {/* ── HORIZONTAL SCROLL PILLS ── */}
      <Text style={styles.sectionHeading}>Profile Sections</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsScroll} contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}>
        {sections.map((s) => <SectionPill key={s.label} label={s.label} pct={s.pct} />)}
      </ScrollView>

      {/* ── ABOUT ME ── */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>About Me</Text>
          <TouchableOpacity onPress={() => setShowAbout(true)}>
            <Text style={styles.cardAction}>Edit</Text>
          </TouchableOpacity>
        </View>
        {about ? (
          <Text style={styles.cardContent}>{about}</Text>
        ) : (
          <Text style={styles.empty}>No description added yet.</Text>
        )}
      </View>
      

      {/* ── KEY SKILLS ── */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Key Skills</Text>
          <TouchableOpacity onPress={() => setShowSkillsModal(true)}>
            <Text style={styles.cardAction}>+ Add</Text>
          </TouchableOpacity>
        </View>

     

        {skills.length > 0 ? (
          <View style={styles.skillsWrap}>
            {skills.map((s, i) => (
              <View key={i} style={styles.skillTag}>
                <Text style={styles.skillTagText}>{s}</Text>
                <TouchableOpacity onPress={() => removeSkill(i)}>
                  <MaterialIcons name="close" size={14} color={COLORS.blue} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          !skillsEditing && <Text style={styles.empty}>No skills added yet.</Text>
        )}
      </View>

      {/* ── EMPLOYMENT ── */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Employment</Text>
          <TouchableOpacity onPress={() => setShowEmployment(true)}>
            <Text style={styles.cardAction}>+ Add</Text>
          </TouchableOpacity>
        </View>
        {employment.length === 0 && <Text style={styles.empty}>No employment added yet.</Text>}
        {employment.map((e, i) => (
          <View key={i} style={styles.listItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.listItemTitle}>{e.title}</Text>
              <Text style={styles.listItemSub}>{e.company} · {e.empType}</Text>
              {(e.joinMonth || e.joinYear) && (
                <Text style={styles.listItemSub}>{e.joinMonth} {e.joinYear}{e.isCurrent === "Yes" ? " · Present" : ""}</Text>
              )}
              <Text style={styles.listItemSub}>Exp: {e.expYears}y {e.expMonths}m{e.salary ? ` · ₹${parseInt(e.salary).toLocaleString("en-IN")}` : ""}</Text>
              {e.profile ? <Text style={[styles.listItemSub, { marginTop: 4 }]}>{e.profile}</Text> : null}
            </View>
            <TouchableOpacity onPress={() => removeEmployment(i)} style={styles.removeBtn}>
              <MaterialIcons name="delete-outline" size={18} color={COLORS.red} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* ── EDUCATION ── */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Education</Text>
          <TouchableOpacity onPress={() => setShowEducation(true)}>
            <Text style={styles.cardAction}>+ Add</Text>
          </TouchableOpacity>
        </View>
        {education.length === 0 && (
          <Text style={styles.empty}>No education added yet. Click "Add" to include your education.</Text>
        )}
        {education.map((e, i) => (
          <View key={i} style={styles.listItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.listItemTitle}>{e.level} – {e.course}{e.spec ? ` (${e.spec})` : ""}</Text>
              <Text style={styles.listItemSub}>{e.institute}</Text>
              <Text style={styles.listItemSub}>{e.courseType}{e.startYear ? ` · ${e.startYear}` : ""}{e.endYear ? ` – ${e.endYear}` : ""}</Text>
              <Text style={styles.listItemSub}>{e.grading}{e.gradeValue ? ` · ${e.gradeValue}` : ""}</Text>
            </View>
            <TouchableOpacity onPress={() => removeEducation(i)} style={styles.removeBtn}>
              <MaterialIcons name="delete-outline" size={18} color={COLORS.red} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* ── CERTIFICATIONS ── */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Certifications</Text>
          <TouchableOpacity onPress={() => setShowCert(true)}>
            <Text style={styles.cardAction}>+ Add</Text>
          </TouchableOpacity>
        </View>
        {certifications.length === 0 && <Text style={styles.empty}>No certifications added yet.</Text>}
        {certifications.map((c, i) => (
          <View key={i} style={styles.listItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.listItemTitle}>🏅 {c.name}</Text>
              {c.org ? <Text style={styles.listItemSub}>{c.org}</Text> : null}
              {c.month && c.year ? <Text style={styles.listItemSub}>Issued {c.month} {c.year}</Text> : null}
              {c.credId ? <Text style={styles.listItemSub}>ID: {c.credId}</Text> : null}
            </View>
            <TouchableOpacity onPress={() => removeCert(i)} style={styles.removeBtn}>
              <MaterialIcons name="delete-outline" size={18} color={COLORS.red} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* ── RESUME ── */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Resume</Text>
          {resumeName && (
            <TouchableOpacity onPress={() => setResumeName(null)}>
              <Text style={[styles.cardAction, { color: COLORS.red }]}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
        {resumeName ? (
          <View style={styles.resumeUploaded}>
            <MaterialIcons name="insert-drive-file" size={28} color={COLORS.green} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.resumeName}>{resumeName}</Text>
              <Text style={styles.resumeSub}>Uploaded successfully</Text>
            </View>
            <MaterialIcons name="check-circle" size={20} color={COLORS.green} />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.uploadBox}
            onPress={pickResume}
          >
            <MaterialIcons name="cloud-upload" size={36} color={COLORS.sub} />
            <Text style={styles.uploadText}>Upload Resume</Text>
            <Text style={styles.uploadSub}>PDF, DOC, DOCX supported</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ height: 40 }} />

      {/* ── MODALS ── */}
      <AboutModal
        visible={showAbout}
        initial={about}
        onClose={() => setShowAbout(false)}
        onSave={setAbout}
      />
      <SkillsModal
  visible={showSkillsModal}
  initial={skills}
  onClose={() => setShowSkillsModal(false)}
  onSave={setSkills}
/>
      <EmploymentModal
        visible={showEmployment}
        onClose={() => setShowEmployment(false)}
        onSave={saveEmployment}
      />
      <EducationModal
        visible={showEducation}
        onClose={() => setShowEducation(false)}
        onSave={saveEducation}
      />
      <CertModal
        visible={showCert}
        onClose={() => setShowCert(false)}
        onSave={saveCert}
      />
      

  

    </ScrollView>
  );
}

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  // ── Header ──
header: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: COLORS.card,
  padding: 14,

  marginHorizontal: 0,   // ✅ CHANGE
  marginTop: 16,
  marginBottom: 8,

  borderRadius: 16,

} , 
avatar: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: COLORS.blue,
    alignItems: "center", justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 16,
    includeFontPadding: false,
    textAlign: "center",
    marginTop: 1,
  },
  name: { fontSize: 16, fontWeight: "700", color: COLORS.text },
  sub: { fontSize: 12, color: COLORS.sub, marginTop: 2 },
  infoRow: { flexDirection: "row", alignItems: "center", marginTop: 6, gap: 4 },
  infoText: { fontSize: 12, color: COLORS.sub },
  progressCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blueLight,
    borderWidth: 2,
    borderColor: COLORS.blue,
  },
  percent: { fontSize: 16, fontWeight: "900", color: COLORS.blue },

  // ── Pills ──
  sectionHeading: { fontSize: 12, fontWeight: "600", color: COLORS.sub, letterSpacing: 0.8, textTransform: "uppercase", marginLeft: 16, marginBottom: 8 },
  pillsScroll: { marginBottom: 12 },
  pill: {
    backgroundColor: COLORS.card, borderRadius: 14, padding: 12,
    minWidth: 120, borderWidth: 2, borderColor: "transparent",
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  pillDone: { borderColor: COLORS.blue },
  pillLabel: { fontSize: 13, fontWeight: "600", color: COLORS.text },
  pillPct: { fontSize: 11, marginTop: 2 },
  pillBar: {
  height: 4,
  backgroundColor: "transparent", // ✅ remove gray
  borderRadius: 4,
  marginTop: 8,
  overflow: "hidden",
},
  pillFill: { height: "100%", backgroundColor: COLORS.green, borderRadius: 4 },

  // ── Card ──
  card: {
    backgroundColor: COLORS.card, borderRadius: 16, padding: 16,
    marginHorizontal: 10, marginBottom: 12,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  cardTitle: { fontSize: 15, fontWeight: "700", color: COLORS.text },
  cardAction: { fontSize: 13, color: COLORS.blue, fontWeight: "600" },
  cardContent: { fontSize: 14, color: COLORS.text, lineHeight: 22, marginTop: 6 },
  empty: { fontSize: 13, color: COLORS.sub, marginTop: 6, lineHeight: 20 },

  // ── Skills ──
  inputRow: { flexDirection: "row", gap: 8, marginTop: 12 },
  skillInput: { flex: 1, borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, color: COLORS.text },
  addBtn: { backgroundColor: COLORS.blue, borderRadius: 10, width: 44, alignItems: "center", justifyContent: "center" },
  addBtnText: { color: "#fff", fontSize: 24, fontWeight: "300", lineHeight: 28 },
  saveBtn: { marginTop: 10, backgroundColor: COLORS.green, borderRadius: 10, padding: 12, alignItems: "center" },
  saveBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  skillsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 },
  skillTag: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.blueLight, borderRadius: 20, paddingVertical: 5, paddingHorizontal: 12, gap: 6 },
  skillTagText: { fontSize: 13, color: COLORS.blue, fontWeight: "500" },

  // ── List Items ──
  listItem: {
  flexDirection: "row",
  alignItems: "flex-start",
  marginTop: 12,
  paddingTop: 12,
  gap: 8,
},
  listItemTitle: { fontSize: 14, fontWeight: "600", color: COLORS.text },
  listItemSub: { fontSize: 12, color: COLORS.sub, marginTop: 2 },
  removeBtn: { padding: 4 },

  // ── Resume ──
  uploadBox: { borderWidth: 2, borderStyle: "dashed", borderColor: COLORS.border, borderRadius: 12, padding: 28, alignItems: "center", marginTop: 10 },
  uploadText: { fontSize: 14, color: COLORS.sub, marginTop: 6, fontWeight: "500" },
  uploadSub: { fontSize: 12, color: "#94A3B8", marginTop: 2 },
  resumeUploaded: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.greenLight, borderRadius: 12, padding: 14, marginTop: 10 },
  resumeName: { fontSize: 13, fontWeight: "600", color: COLORS.green },
  resumeSub: { fontSize: 11, color: COLORS.sub, marginTop: 2 },

  // ── Modal ──
  modalOverlay: { flex: 1, backgroundColor: "rgba(15,23,42,0.5)", justifyContent: "flex-end" },
  modalBox: {
    backgroundColor: "#fff", borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, maxHeight: "90%",
    shadowColor: "#000", shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 20,
  },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: "700", color: COLORS.text },
  modalClose: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.bg, alignItems: "center", justifyContent: "center" },
  modalFooter: {
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: 10,
  marginTop: 20,
  paddingTop: 16,
  marginBottom: 8,
},
  btnCancel: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, borderWidth: 1.5, borderColor: COLORS.border },
  btnCancelText: { fontSize: 14, fontWeight: "600", color: COLORS.text },
  btnSave: { paddingVertical: 10, paddingHorizontal: 24, borderRadius: 10, backgroundColor: COLORS.blue },
  btnSaveText: { fontSize: 14, fontWeight: "600", color: "#fff" },

  // ── Form ──
  formGroup: { marginBottom: 14 },
  formLabel: { fontSize: 13, fontWeight: "600", color: COLORS.sub, marginBottom: 6 },
  formInput: { borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 11, fontSize: 14, color: COLORS.text, backgroundColor: "#fff" },
  rowHalf: { flexDirection: "row", gap: 10 },

  // ── Radio ──
  radioRow: { flexDirection: "row", flexWrap: "wrap", gap: 16, marginTop: 4 },
  radioOpt: { flexDirection: "row", alignItems: "center", gap: 6 },
  radioCircle: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: COLORS.border, alignItems: "center", justifyContent: "center" },
  radioCircleActive: { borderColor: COLORS.blue },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.blue },
  radioLabel: { fontSize: 14, color: COLORS.text },

  // ── Select ──
  selectBox: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 11, backgroundColor: "#fff", flex: 1 },
  selectValue: { fontSize: 14, color: COLORS.text },
  selectPlaceholder: { fontSize: 14, color: "#94A3B8" },
  selectOverlay: { flex: 1, backgroundColor: "rgba(15,23,42,0.4)", justifyContent: "center", alignItems: "center", padding: 24 },
  selectDropdown: { backgroundColor: "#fff", borderRadius: 16, width: "100%", padding: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 10 },
  dropdownTitle: { fontSize: 14, fontWeight: "700", color: COLORS.text, padding: 14, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  dropdownItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12, paddingHorizontal: 14 },
  dropdownItemActive: { backgroundColor: COLORS.blueLight, borderRadius: 10 },
  dropdownItemText: { fontSize: 14, color: COLORS.text },
});